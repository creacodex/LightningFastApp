using Repository.Context;
using Repository.Interface;
using Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Repository
{
    public class ShippingTypeRepository : Repository<ShippingType>, IShippingTypeRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public ShippingTypeRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public IEnumerable<ShippingType> List()
        {
            return _dbSet
                .AsNoTracking()
                .Where(x => x.IsVisible)
                .OrderBy(x => x.Name);
        }
    }
}