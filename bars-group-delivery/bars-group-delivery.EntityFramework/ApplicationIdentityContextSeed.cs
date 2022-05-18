using bars_group_delivery.EntityFramework.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using bars_group_delivery.EntityFramework.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bars_group_delivery.EntityFramework
{

    public class ApplicationIdentityContextSeed
    {
        public static async Task SeedAsync(ApplicationContext dbContext, UserManager<Account> userManager, RoleManager<IdentityRole> roleManager)
        {
            if(dbContext.Database.IsNpgsql())
            {
                dbContext.Database.Migrate();
            }

            await SeedRolesAsync(roleManager);
            await SeedUsersAsync(userManager);
        }
        public static async Task SeedUsersAsync(UserManager<Account> userManager)
        {
            string defaultPassword = "Pass@word1";

            string defaultUserName = "79998887766";
            var defaultUser = new Account { UserName = defaultUserName, Name = "User FullName" };
            await userManager.CreateAsync(defaultUser, defaultPassword);

            string adminUserName = "admin";
            var adminUser = new Account { UserName = adminUserName, Name = "Admin FullName" };
            await userManager.CreateAsync(adminUser, defaultPassword);

            string employeeUserName = "employee";
            var employeeUser = new Account { UserName = employeeUserName, Name = "Employee FullName" };
            await userManager.CreateAsync(employeeUser, defaultPassword);

            defaultUser = await userManager.FindByNameAsync(defaultUserName);
            adminUser = await userManager.FindByNameAsync(adminUserName);
            employeeUser = await userManager.FindByNameAsync(adminUserName);

            await userManager.AddToRolesAsync(defaultUser, new string[] { Role.User.GetDescriptionAttribute() });
            await userManager.AddToRolesAsync(adminUser, new string[] { Role.Admin.GetDescriptionAttribute(), Role.Employee.GetDescriptionAttribute() });
            await userManager.AddToRolesAsync(employeeUser, new string[] { Role.Employee.GetDescriptionAttribute() });
        }
        public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            var rolesNames = Enum.GetValues(typeof(Role))
                .Cast<Role>()
                .Select(roleEnum => roleEnum.GetDescriptionAttribute().ToLower())
                .ToList();

            foreach (string role in rolesNames)
            {
                if (!roleManager.Roles.Any(r => r.Name == role))
                {
                    await roleManager.CreateAsync(new IdentityRole() { Name = role.ToLower(), NormalizedName = role.ToUpper() });
                }
                else
                {
                    var roleToUpdate = await roleManager.FindByNameAsync(role);
                    roleToUpdate.NormalizedName = role.ToUpper();
                    roleToUpdate.Name = role.ToLower();

                    await roleManager.UpdateAsync(roleToUpdate);
                }
            }
        }
    }
}
