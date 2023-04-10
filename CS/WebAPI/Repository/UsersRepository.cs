using Repository.Context;
using Repository.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Model;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Repository
{
    public sealed class UsersRepository : IUsersRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly DbSet<ApplicationUser> _dbSet;
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersRepository(ApplicationDbContext applicationDbContext,
                               UserManager<ApplicationUser> userManager)
        {
            _applicationDbContext = applicationDbContext;
            _dbSet = applicationDbContext.Set<ApplicationUser>();
            _userManager = userManager;
        }

        public async Task<EntitiesResult<ApplicationUser>> ListAsync(int page, int pageSize, string orderBy, bool isAscending, string searchField, string searchValue)
        {
            if (pageSize > 500) pageSize = 25;

            IQueryable<ApplicationUser> source = _dbSet.AsQueryable();

            if (!string.IsNullOrEmpty(orderBy))
            {
                if (string.Equals(orderBy.ToLower(), "firstName"))
                {
                    source = source.OrderBy(x => x.FirstName);
                }
            }
            else
            {
                source = source.OrderBy(x => x.FirstName)
                               .ThenBy(x => x.LastName);
            }

            EntitiesResult<ApplicationUser> entitiesResult = new EntitiesResult<ApplicationUser>
            {
                TotalRows = source.Count(),
                Entities = await source
                    .AsNoTracking()
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync()
            };

            return entitiesResult;
        }

        public async Task<ApplicationUser> FindAsync(Guid id)
        {
            return await _userManager.FindByIdAsync(id.ToString());
        }

        public async Task<IdentityResult> CreateAsync(ApplicationUser entity, string password)
        {
            return await _userManager.CreateAsync(entity, password);
        }

        public async Task<IdentityResult> UpdateAsync(ApplicationUser entity)
        {
            return await _userManager.UpdateAsync(entity);
        }

        public async Task<IdentityResult> RemoveAsync(Guid id)
        {
            ApplicationUser entity = await _userManager.FindByIdAsync(id.ToString());
            return await _userManager.DeleteAsync(entity);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _applicationDbContext.SaveChangesAsync();
        }
    }
}