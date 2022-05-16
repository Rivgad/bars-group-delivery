using bars_group_delivery.EntityFramework.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bars_group_delivery.EntityFramework
{
    public class ApplicationContext : IdentityDbContext<IdentityUser, IdentityRole, string>
    {
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Address> Addresses { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options):base(options)
        {
            
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            modelBuilder.Entity<OrderProduct>(
                 j =>
                 {
                     j.HasKey(item => new { item.ProductId, item.OrderId });
                     j.Property(item => item.Quantity);
                 });
            base.OnModelCreating(modelBuilder);
        }
    }
}
