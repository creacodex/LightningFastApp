using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    public partial class CarrierType
    {
        public Guid Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(20)")]
        public string Name { get; set; }

        public bool IsVisible { get; set; }

        public virtual ICollection<Delivery> Deliveries { get; set; }
    }
}

