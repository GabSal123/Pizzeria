using Microsoft.AspNetCore.Mvc;
using Pizzeria.Models;
using Pizzeria.Data;
using Microsoft.EntityFrameworkCore;
using Pizzeria.Models.Interfaces;

namespace Pizzeria.Controllers
{
    [Route("api/PizzaAPI")]
    [ApiController]
    public class PizzaAPIController : ControllerBase
    {
        readonly IPizzaRepository pizzaRepository;
        public PizzaAPIController(IPizzaRepository repo)
        {
            pizzaRepository = repo;
        }
        [HttpGet]
        public ActionResult<List<PizzaModel>> Get()
        {
            return Ok(pizzaRepository.GetPizzas());
        }
    }
}
