using Microsoft.EntityFrameworkCore.ChangeTracking;
using Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IRepository<T> where T : class
    {
        Task<EntitiesResult<T>> ListAsync(int page, int pageSize, string orderBy, bool isAscending, string searchField, string searchValue);

        Task<IEnumerable<T>> ListAsync();

        Task<T> FindAsync(Guid id);

        ValueTask<EntityEntry<T>> AddAsync(T entity);

        EntityEntry<T> Update(T entity);

        Task<EntityEntry<T>> RemoveAsync(Guid id);

        Task<int> SaveChangesAsync();
    }
}
