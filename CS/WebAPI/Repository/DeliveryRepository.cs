using Repository.Context;
using Repository.Interface;
using Model;

namespace Repository
{
    public class DeliveryRepository : Repository<Delivery>, IDeliveryRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public DeliveryRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        
    }
}