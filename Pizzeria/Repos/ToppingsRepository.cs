using Pizzeria.Models;
using Microsoft.EntityFrameworkCore;
using Pizzeria.Data;
using Pizzeria.Models.Interfaces;

namespace Pizzeria.Repos
{
    public class ToppingsRepository : IToppingsRepository
    {

        public ToppingsRepository()
        {
            using (var context = new ToppingsAPIDbContext())
            {

                var toppings = new List<ToppingsModel>
                {
                new ToppingsModel
                {
                    Id= Guid.NewGuid(),
                    Name ="Ham"

            },
                new ToppingsModel
                {
                    Id= Guid.NewGuid(),
                    Name ="Cheese"

            },
                new ToppingsModel
                {
                    Id= Guid.NewGuid(),
                    Name ="Artichokes"

            },
                new ToppingsModel
                {
                    Id= Guid.NewGuid(),
                    Name ="Olives"
            },
                new ToppingsModel
                {
                    Id= Guid.NewGuid(),
                    Name ="Onion"

            },
                new ToppingsModel
                {
                    Id=Guid.NewGuid(),
                    Name ="Mushrooms"
                }
                };
                int toppingsCount = toppings.Count();
                if (toppingsCount != context.Toppings.Count())
                {
                    context.Toppings.AddRange(toppings);
                }

                context.SaveChanges();



            }
        }
        public List<ToppingsModel> GetToppings()
        {
            using (var context = new ToppingsAPIDbContext())
            {
                var list = context.Toppings
                    .ToList();
                return list;
            }
        }
    }
}
