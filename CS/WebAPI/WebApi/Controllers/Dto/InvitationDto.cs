using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.Dto
{
    public class InvitationDto
    {
        [Required]
        [StringLength(100, ErrorMessage = "The field First Name cannot be greater than 100 characters.")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The field Last Name cannot be greater than 100 characters.")]
        public string LastName { get; set; }

        [Required]
        [StringLength(256, ErrorMessage = "The field Email cannot be greater than 256 characters.")]
        public string Email { get; set; }
    }
}

