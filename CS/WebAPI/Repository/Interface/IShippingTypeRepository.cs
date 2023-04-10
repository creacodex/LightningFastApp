using Model;
using System;
using System.Collections.Generic;

namespace Repository.Interface
{
    public interface IShippingTypeRepository : IRepository<ShippingType>
    {
        IEnumerable<ShippingType> List();
    }
}
