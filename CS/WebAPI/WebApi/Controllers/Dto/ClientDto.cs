using System;

namespace WebApi.Controllers.Dto
{
    public class ClientDto
    {
        public Guid? Id { get; set; }

        public DateTime? BirthdayDate { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Phone01 { get; set; }

        public string WebSite { get; set; }

        public bool IsActive { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeleteDate { get; set; }
    }
}

