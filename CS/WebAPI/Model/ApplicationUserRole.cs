using Microsoft.AspNetCore.Identity;
using System;

namespace Model
{
    public class ApplicationUserRole : IdentityRole<Guid>
    {
        public ApplicationUserRole() : base()
        {

        }

        public ApplicationUserRole(string roleName) : base(roleName)
        {

        }
    }
}
