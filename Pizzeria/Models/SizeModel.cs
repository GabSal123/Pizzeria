namespace Pizzeria.Models
{
    public class SizeModel
    {

        public Guid Id { get; set; }
        public string SizeOfPizza { get; set; }
        public decimal Price { get; set; }
    }

    public enum Size
    {
        Small=1,
        Medium=2,
        Large=3
    }
}
