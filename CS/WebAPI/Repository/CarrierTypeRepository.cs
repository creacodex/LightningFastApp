using Repository.Context;
using Repository.Interface;
using Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Repository
{
    public class CarrierTypeRepository : Repository<CarrierType>, ICarrierTypeRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public CarrierTypeRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public IEnumerable<CarrierType> List()
        {
            return _dbSet
                .AsNoTracking()
                .Where(x => x.IsVisible)
                .OrderBy(x => x.Name);
        }
    }
}