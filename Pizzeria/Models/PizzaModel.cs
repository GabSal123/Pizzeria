namespace Pizzeria.Models
{
    public class PizzaModel
    {

        public Guid Id { get; set; }
        public string ImageTitle { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; } = 0;
        public string Size { get; set; } = string.Empty;
        public int ToppingCount { get; set; } = 0;



        public void GetPrice()
        {
            if (Size.Equals("Large"))
            {
                Price = 12;
            }else if (Size.Equals("Medium"))
            {
                Price = 10;
            }
            else
            {
                Price = 8;
            }
            this.Price = CalculatePrice(this.Price);


        }
        private decimal CalculatePrice(decimal price)
        {
            Price += ToppingCount;
            if(ToppingCount > 3)
            {
                return Price = Price * 0.9m;
            }
            return Price;
        }
    }
}
