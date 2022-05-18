using bars_group_delivery.EntityFramework;
using bars_group_delivery.EntityFramework.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace bars_group_delivery.WebAPI.Extensions
{

    public static class ApplicationBuilderExtensions
    {
        public static async Task<IApplicationBuilder> PrepareDatabase(this WebApplication app)
        {
            app.Logger.LogInformation("App created...");
            
            app.Logger.LogInformation("Seeding Database...");

            using (var scope = app.Services.CreateScope())
            {
                var scopedProvider = scope.ServiceProvider;
                try
                {
                    var appContext = scopedProvider.GetRequiredService<ApplicationContext>();
                    await ApplicationProductsContextSeed.SeedAsync(appContext, app.Logger);


                    var userManager = scopedProvider.GetRequiredService<UserManager<Account>>();
                    var roleManager = scopedProvider.GetRequiredService<RoleManager<IdentityRole>>();
                    var identityContext = scopedProvider.GetRequiredService<ApplicationContext>();

                    await ApplicationIdentityContextSeed.SeedAsync(identityContext, userManager, roleManager);

                    app.Logger.LogInformation($"Database seeded");
                }
                catch (Exception ex)
                {
                    app.Logger.LogError(ex, "An error occurred seeding the DB.");
                }
            }


            return app;
        }
    }
}
