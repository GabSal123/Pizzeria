namespace Pizzeria.Models.Interfaces
{
    public interface ISizeRepository
    {
        public List<SizeModel> GetSizes();
        public decimal GetPriceOfPizza(string size, string[] toppings);
    }
}
