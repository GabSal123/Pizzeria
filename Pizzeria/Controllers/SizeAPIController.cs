using Microsoft.AspNetCore.Mvc;
using Pizzeria.Models;
using Pizzeria.Data;
using Microsoft.EntityFrameworkCore;
using Pizzeria.Models.Interfaces;
namespace Pizzeria.Controllers
{
    [Route("api/SizeAPI")]
    [ApiController]
    public class SizeAPIController : Controller
    {

        readonly ISizeRepository sizesRepository;

        public SizeAPIController(ISizeRepository repo)
        {
            sizesRepository = repo;
        }

        [HttpGet]
        public ActionResult<List<ToppingsModel>> Get()
        {
            return Ok(sizesRepository.GetSizes());
        }

        [HttpGet]
        [Route("price")]
        public ActionResult<decimal> GetPrice(string size, [FromQuery] string[] toppings)
        {
            return Ok(sizesRepository.GetPriceOfPizza(size,toppings));
        }
    }
}
