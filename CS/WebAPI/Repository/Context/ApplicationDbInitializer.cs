using Core.Identity.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Model;
using Model.Identity;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Repository.Context
{
    public static class ApplicationDbInitializer
    {
        public static async Task InitializeAsync(IServiceProvider services)
        {
            ApplicationDbContext dbContext = services.GetRequiredService<ApplicationDbContext>();
            await MigrateDatabaseAsync(services, dbContext);
            await SeedRolesAsync(services, dbContext);
            await SeedUsersAsync(services, dbContext);
            await SeedDatabaseAsync(services, dbContext);
        }

        private static async Task MigrateDatabaseAsync(IServiceProvider services, ApplicationDbContext dbContext)
        {
            dbContext.Database.Migrate();
            await dbContext.SaveChangesAsync();
        }

        private static async Task SeedRolesAsync(IServiceProvider services, ApplicationDbContext dbContext)
        {
            dbContext = services.GetRequiredService<ApplicationDbContext>();

            string[] roles = new string[] {
                    Roles.Administrator,
                    Roles.Manager,
                    Roles.User
                };

            RoleManager<ApplicationUserRole> roleManager = services.GetRequiredService<RoleManager<ApplicationUserRole>>();

            foreach (string role in roles)
            {
                if (!dbContext.Roles.Any(r => r.Name.Equals(role)))
                {
                    IdentityResult result = await roleManager.CreateAsync(new ApplicationUserRole(role));

                    if (!result.Succeeded)
                    {
                        throw new ArgumentException(result.Errors.First().Description);
                    }

                }
            }

            await dbContext.SaveChangesAsync();
        }

        private static async Task SeedUsersAsync(IServiceProvider services, ApplicationDbContext dbContext)
        {
            dbContext = services.GetRequiredService<ApplicationDbContext>();
            IdentitySettings defaultUserAccountsSettings = services.GetRequiredService<IOptions<IdentitySettings>>().Value;

            RoleManager<ApplicationUserRole> roleManager = services.GetRequiredService<RoleManager<ApplicationUserRole>>();
            UserManager<ApplicationUser> userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

            foreach (UserAccount userAccount in defaultUserAccountsSettings.UserAccounts)
            {
                if (!dbContext.Users.Any(u => u.Email.Equals(userAccount.Email)))
                {
                    ApplicationUserRole role = await roleManager.FindByNameAsync(userAccount.RoleName);

                    ApplicationUser user = new ApplicationUser { 
                        FirstName = userAccount.FirstName,
                        LastName = userAccount.LastName,
                        UserName = userAccount.Email,
                        Email = userAccount.Email,
                        EmailConfirmed = true,
                    };

                    IdentityResult result = await userManager.CreateAsync(user, userAccount.Password);

                    if (!result.Succeeded)
                    {
                        throw new ArgumentException(result.Errors.First().Description);
                    }
                }
            }

            await dbContext.SaveChangesAsync();
        }

        private static async Task SeedDatabaseAsync(IServiceProvider services, ApplicationDbContext dbContext)
        {
            //string script = File.ReadAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Assets/initial_data.sql"));
            //await dbContext.Database.ExecuteSqlRawAsync(script);
        }
    }
}
