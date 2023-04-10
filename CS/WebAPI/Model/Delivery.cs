using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    public partial class Delivery
    {
        public Guid Id { get; set; }

        public int Reference { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public Guid ShippingTypeId { get; set; }

        public Guid? CarrierTypeId { get; set; }

        public DateTime DeliveryDate { get; set; }

        public int Quantity { get; set; }

        [Column(TypeName = "decimal(28, 13)")]
        public decimal Price { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal? Discount { get; set; }

        public bool AcceptConditions { get; set; }

        public Guid ClientId { get; set; }

        public virtual ShippingType ShippingType { get; set; }
        public virtual CarrierType CarrierType { get; set; }
        public virtual Client Client { get; set; }
    }
}

