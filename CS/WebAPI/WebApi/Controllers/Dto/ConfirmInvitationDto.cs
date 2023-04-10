using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.Dto
{
    public class ConfirmInvitationDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public string Code { get; set; }
    }
}

