using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Identity.Settings
{
    public class IdentitySettings
    {
        [Required]
        [MinLength(1)]
        public List<UserAccount> UserAccounts { get; set; }
    }
}
