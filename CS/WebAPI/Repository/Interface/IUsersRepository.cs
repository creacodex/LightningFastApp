using Microsoft.AspNetCore.Identity;
using Model;
using System;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IUsersRepository
    {
        Task<EntitiesResult<ApplicationUser>> ListAsync(int page, int pageSize, string orderBy, bool isAscending, string searchField, string searchValue);
        Task<ApplicationUser> FindAsync(Guid id);

        Task<IdentityResult> UpdateAsync(ApplicationUser entity);

        Task<IdentityResult> RemoveAsync(Guid id);

        Task<IdentityResult> CreateAsync(ApplicationUser entity, string password);

        Task<int> SaveChangesAsync();
    }
}
