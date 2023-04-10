using System;

namespace WebApi.Controllers.Dto
{
    public class ShippingTypeDto
    {
        public Guid? Id { get; set; }

        public string Name { get; set; }

        public bool IsVisible { get; set; }
    }
}

