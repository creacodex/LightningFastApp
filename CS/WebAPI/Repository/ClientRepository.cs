using Repository.Context;
using Repository.Interface;
using Model;

namespace Repository
{
    public class ClientRepository : Repository<Client>, IClientRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public ClientRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        
    }
}