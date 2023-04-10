using Model;
using System;
using System.Collections.Generic;

namespace Repository.Interface
{
    public interface ICarrierTypeRepository : IRepository<CarrierType>
    {
        IEnumerable<CarrierType> List();
    }
}
