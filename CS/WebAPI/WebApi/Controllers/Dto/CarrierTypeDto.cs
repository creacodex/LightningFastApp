using System;

namespace WebApi.Controllers.Dto
{
    public class CarrierTypeDto
    {
        public Guid? Id { get; set; }

        public string Name { get; set; }

        public bool IsVisible { get; set; }
    }
}

