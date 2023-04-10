using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.Dto
{
    public class UsersDto
    {
        [Required(ErrorMessage = "The field PhoneNumberConfirmed is required.")]
        public Guid Id { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The field First Name cannot be greater than 100 characters.")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The field Last Name cannot be greater than 100 characters.")]
        public string LastName { get; set; }

        [StringLength(256, ErrorMessage = "The field Email cannot be greater than 256 characters.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "The field EmailConfirmed is required.")]
        public bool EmailConfirmed { get; set; }

        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "The field PhoneNumberConfirmed is required.")]
        public bool PhoneNumberConfirmed { get; set; }

        [Required(ErrorMessage = "The field TwoFactorEnabled is required.")]
        public bool TwoFactorEnabled { get; set; }

    }
}

