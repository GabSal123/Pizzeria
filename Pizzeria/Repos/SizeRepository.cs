using Pizzeria.Models;
using Microsoft.EntityFrameworkCore;
using Pizzeria.Data;
using Pizzeria.Models.Interfaces;
namespace Pizzeria.Repos
{
    public class SizeRepository : ISizeRepository
    {
        public SizeRepository()
        {
            using (var context = new SizeAPIDbContext())
            {

                var sizes = new List<SizeModel>
                {
                new SizeModel
                {
                    Id= Guid.NewGuid(),
                    SizeOfPizza =Size.Small.ToString(),
                    Price = 8m

            },
                new SizeModel
                {
                    Id = Guid.NewGuid(),
                    SizeOfPizza = Size.Medium.ToString(),
                    Price = 10m

            },
                new SizeModel
                {
                    Id= Guid.NewGuid(),
                    SizeOfPizza =Size.Large.ToString(),
                    Price = 12

            }
                };
                int sizesCount = sizes.Count();
                if (sizesCount != context.Sizes.Count())
                {
                    context.Sizes.AddRange(sizes);
                }

                context.SaveChanges();



            }
        }

        public decimal GetPriceOfPizza(string size, string[] toppings)
        {
            decimal price = 0;
            if (size.Equals("Small"))
            {
                price = 8;
            }
            if (size.Equals("Medium"))
            {
                price = 10;
            }
            if (size.Equals("Large"))
            {
                price = 12;
            }

            price += toppings.Length;
            if(toppings.Length > 3)
            {
                price *= 0.9m;
            }
            return price;
        }

        public List<SizeModel> GetSizes()
        {
            using (var context = new SizeAPIDbContext())
            {
                var list = context.Sizes
                    .ToList();
                return list;
            }
        }
    }
}
