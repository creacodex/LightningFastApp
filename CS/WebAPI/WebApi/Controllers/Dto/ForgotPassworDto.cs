using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.Dto
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
