using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace bars_group_delivery.EntityFramework
{
    public class DesignTimeIdentityDbContextFactory : IDesignTimeDbContextFactory<ApplicationContext>
    {
        public ApplicationContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=bars-group-delivery;Username=bars-group-delivery-admin;Password=KdW#^1Ywc@9q");
            
            return new ApplicationContext(optionsBuilder.Options);
        }
    }
}