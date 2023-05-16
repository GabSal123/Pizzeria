using Microsoft.EntityFrameworkCore;
using Pizzeria.Models;

namespace Pizzeria.Data
{
    public class PizzaAPIDbContext : DbContext
    {
       /* public PizzaAPIDbContext(DbContextOptions<PizzaAPIDbContext> options) : base(options)
        {
        }*/

        protected override void OnConfiguring
       (DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "PizzasDb");
        }
        public DbSet<PizzaModel> Pizzas { get; set; }

       

    }


    
}
