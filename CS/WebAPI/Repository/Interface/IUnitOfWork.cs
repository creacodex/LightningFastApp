namespace Repository.Interface
{
    public interface IUnitOfWork
    {
        ICarrierTypeRepository CarrierType { get; }
        IClientRepository Client { get; }
        IDeliveryRepository Delivery { get; }
        IShippingTypeRepository ShippingType { get; }
        IUsersRepository Users { get; }
    }
}
