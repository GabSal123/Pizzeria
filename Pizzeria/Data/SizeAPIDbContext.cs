using Microsoft.EntityFrameworkCore;
using Pizzeria.Models;
namespace Pizzeria.Data

{
    public class SizeAPIDbContext : DbContext
    {
        protected override void OnConfiguring
      (DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "SizesDb");
        }
        public DbSet<SizeModel> Sizes { get; set; }
    }
}
