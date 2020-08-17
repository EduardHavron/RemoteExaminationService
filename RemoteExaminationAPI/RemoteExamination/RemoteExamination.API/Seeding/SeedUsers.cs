using Microsoft.AspNetCore.Identity;
using RemoteExamination.Common.Authentication;
using RemoteExamination.DAL.Entities;

namespace RemoteExamination.API.Seeding
{
    public static class SeedUsers
    {
        public static void SeedAdminUser(UserManager<User> userManager)
        {
            const string adminEmail = "kyrylo.stakhevych@gmail.com";
            const string adminPassword = "156980ABCd!";
            if (userManager.FindByEmailAsync(adminEmail).Result == null)
            {
                var admin = new User
                {
                    UserName = adminEmail,
                    Email = adminEmail
                };
                var result = userManager.CreateAsync(admin, adminPassword).Result;

                if (result.Succeeded) userManager.AddToRoleAsync(admin, Role.Admin).Wait();
            }
        }
    }
}