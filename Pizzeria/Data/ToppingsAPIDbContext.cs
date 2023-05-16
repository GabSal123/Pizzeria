
using Microsoft.EntityFrameworkCore;
using Pizzeria.Models;
namespace Pizzeria.Data

{
    public class ToppingsAPIDbContext : DbContext
    {
        protected override void OnConfiguring
       (DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "ToppingsDb");
        }
        public DbSet<ToppingsModel> Toppings { get; set; }


    }
}
