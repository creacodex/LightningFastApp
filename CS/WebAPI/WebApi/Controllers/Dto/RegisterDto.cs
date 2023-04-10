using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.Dto
{
    public class RegisterDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }

        [Required]
        [StringLength(256, ErrorMessage = "The field Email cannot be greater than 256 characters.")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}

