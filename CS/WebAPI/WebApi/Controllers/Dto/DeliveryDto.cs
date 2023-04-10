using System;

namespace WebApi.Controllers.Dto
{
    public class DeliveryDto
    {
        public Guid? Id { get; set; }

        public int Reference { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public Guid ShippingTypeId { get; set; }

        public Guid? CarrierTypeId { get; set; }

        public DateTime DeliveryDate { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public decimal? Discount { get; set; }

        public bool AcceptConditions { get; set; }

        public Guid ClientId { get; set; }

        public virtual ShippingTypeDto ShippingType { get; set; }
        public virtual CarrierTypeDto CarrierType { get; set; }
        public virtual ClientDto Client { get; set; }
    }
}

