using Pizzeria.Models;
using Microsoft.EntityFrameworkCore;
using Pizzeria.Data;
using Pizzeria.Models.Interfaces;

namespace Pizzeria.Repos
{
    public class PizzaRepository : IPizzaRepository
    {
        public PizzaRepository()
        {
            using (var context = new PizzaAPIDbContext())
            {
                
                var pizzas = new List<PizzaModel>
                {
                new PizzaModel
                {
                    Id= Guid.NewGuid(),
                    Name ="Margherita",
                    ImageTitle = "Margherita.jpg"

            },
                new PizzaModel
                {
                    Id= Guid.NewGuid(),
                    Name ="Capricciosa",
                    ImageTitle = "Capricciosa.jpg"

            },
                new PizzaModel
                {
                    Id= Guid.NewGuid(),
                    Name ="Meatzza",
                    ImageTitle = "Meatzza.jpg"

            },
                new PizzaModel
                {
                    Id= Guid.NewGuid(),
                    Name ="Peperoni",
                    ImageTitle = "Peperoni.jpg"

            },
                new PizzaModel
                {
                    Id= Guid.NewGuid(),
                    Name ="Spicy",
                    ImageTitle = "Spicy.jpg"

            },
                new PizzaModel
                {
                    Id=Guid.NewGuid(),
                    Name ="Barbecue",
                    ImageTitle = "Barbecue.jpg"
                }
                };
                int pizzaCount =pizzas.Count();
                if (pizzaCount != context.Pizzas.Count())
                {
                    context.Pizzas.AddRange(pizzas);
                }
                
                context.SaveChanges();
            }
        }
        public List<PizzaModel> GetPizzas()
        {
            using (var context = new PizzaAPIDbContext())
            {
                var list = context.Pizzas
                    .ToList();
                return list;
            }
        }
    }
}
