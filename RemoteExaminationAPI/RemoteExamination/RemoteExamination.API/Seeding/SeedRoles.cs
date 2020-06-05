using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using RemoteExamination.Common.Authentication;

namespace RemoteExamination.API.Seeding
{
    public static class SeedRoles
    {
        public static void SeedAdminRole(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync(Role.Admin).Result)
            {
                var role = new IdentityRole
                {
                    Name = Role.Admin,
                    NormalizedName = Role.Admin.ToUpper()
                };
                roleManager.CreateAsync(role).Wait();
            }
        }
    }
}
