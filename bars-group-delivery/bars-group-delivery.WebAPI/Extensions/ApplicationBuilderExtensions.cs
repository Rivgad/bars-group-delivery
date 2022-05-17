using bars_group_delivery.EntityFramework;
using bars_group_delivery.EntityFramework.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace bars_group_delivery.WebAPI.Extensions
{

    public static class ApplicationBuilderExtensions
    {
        internal class AccountDto
        {
            public string Login { get; set; } = String.Empty;
            public string Password { get; set; } = String.Empty;
            public string[] Roles { get; set; }
        }
        public static async Task<IApplicationBuilder> PrepareDatabase(this IApplicationBuilder app, IConfiguration configuration)
        {
            bool InitializeDbOnStart = configuration.GetValue<bool>("InitializeDbOnStart");
            if (!InitializeDbOnStart)
                return app;

            using var scopedServices = app.ApplicationServices.CreateScope();
            var serviceProvider = scopedServices.ServiceProvider;

            var context = serviceProvider.GetRequiredService<ApplicationContext>();
            context.Database.Migrate();

            var userManager = serviceProvider.GetRequiredService<UserManager<Account>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();


            var rolesNames = Enum.GetValues(typeof(Role))
                .Cast<Role>()
                .Select(roleEnum =>roleEnum.GetDescriptionAttribute().ToLower())
                .ToList();

            foreach (string role in rolesNames)
            {
                if (!roleManager.Roles.Any(r => r.Name == role))
                {
                    await roleManager.CreateAsync(new IdentityRole() { Name = role.ToLower(), NormalizedName = role.ToUpper() });
                }
            }

            AccountDto[] defaultUsers = configuration.GetSection("DefaultUsers").Get<AccountDto[]>();
            if (defaultUsers != null)
            {
                Console.WriteLine("Start creating default users");
                foreach (var defaultUser in defaultUsers)
                {
                    var res = VerifyAccount(defaultUser);

                    if (res)
                    {
                        var accountToDelete = await userManager.FindByNameAsync(defaultUser.Login);
                        if(accountToDelete != null)
                            await userManager.DeleteAsync(accountToDelete);

                        var identityResult = await userManager.CreateAsync(new Account()
                        {
                            UserName = defaultUser.Login
                        }, defaultUser.Password);
                        if (identityResult.Succeeded)
                        {
                            var account = await userManager.FindByNameAsync(defaultUser.Login);
                            await userManager.AddToRolesAsync(account, defaultUser.Roles);
                        }
                    }
                }
            }

            await context.SaveChangesAsync();


            return app;
        }
        private static bool VerifyAccount(AccountDto accountDto)
        {
            if (string.IsNullOrEmpty(accountDto.Login) || string.IsNullOrEmpty(accountDto.Password) || accountDto.Roles.Length == 0)
                return false;
            var res = VerifyRoles(accountDto.Roles);

            return res;
        }
        private static bool VerifyRoles(string[] roles)
        {
            foreach (var str in roles)
            {
                Role role;
                bool res = Enum.TryParse(
                    value: str,
                    ignoreCase: true,
                    result: out role);

                if (!res)
                    return false;
            }

            return true;
        }
    }
}
