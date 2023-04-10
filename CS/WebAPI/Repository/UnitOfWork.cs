using Repository.Context;
using Repository.Interface;
using Microsoft.AspNetCore.Identity;
using Model;

namespace Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public ICarrierTypeRepository CarrierType { get; private set; }
        public IClientRepository Client { get; private set; }
        public IDeliveryRepository Delivery { get; private set; }
        public IShippingTypeRepository ShippingType { get; private set; }
        public IUsersRepository Users { get; private set; }

        public UnitOfWork(ApplicationDbContext applicationDbContext,
                          UserManager<ApplicationUser> userManager)
        {
            _applicationDbContext = applicationDbContext;

            CarrierType = new CarrierTypeRepository(applicationDbContext);
            Client = new ClientRepository(applicationDbContext);
            Delivery = new DeliveryRepository(applicationDbContext);
            ShippingType = new ShippingTypeRepository(applicationDbContext);
            Users = new UsersRepository(applicationDbContext, userManager);
        }
    }
}
