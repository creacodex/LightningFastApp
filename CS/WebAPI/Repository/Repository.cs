using Repository.Context;
using Repository.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly ApplicationDbContext _applicationDbContext;
        internal DbSet<T> _dbSet;

        public Repository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            _dbSet = applicationDbContext.Set<T>();
        }

        public virtual async Task<IEnumerable<T>> ListAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public virtual async Task<EntitiesResult<T>> ListAsync(int page, int pageSize, string orderBy, bool isAscending, string searchField, string searchValue)
        {
            if (pageSize > 500) pageSize = 25;
            
            IQueryable<T> source = _dbSet.AsQueryable();

            EntitiesResult<T> entitiesResult = new EntitiesResult<T>
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

        public virtual async Task<T> FindAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public virtual async ValueTask<EntityEntry<T>> AddAsync(T entity)
        {
            return await _dbSet.AddAsync(entity);
        }

        public virtual EntityEntry<T> Update(T entity)
        {
            return _dbSet.Update(entity);
        }

        public virtual async Task<EntityEntry<T>> RemoveAsync(Guid id)
        {
            T entity = await _dbSet.FindAsync(id);
            if (entity == null)
            {
                return null;
            }
            return _dbSet.Remove(entity);
        }

        public virtual async Task<int> SaveChangesAsync()
        {
            return await _applicationDbContext.SaveChangesAsync();
        }
    }
}
