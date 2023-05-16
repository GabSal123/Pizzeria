
using Microsoft.AspNetCore.Mvc;
using Pizzeria.Models;
using Pizzeria.Data;
using Microsoft.EntityFrameworkCore;
using Pizzeria.Models.Interfaces;

namespace Pizzeria.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ToppingsAPIController : ControllerBase
    {

        readonly IToppingsRepository toppingsRepository;

        public ToppingsAPIController(IToppingsRepository repo)
        {
            toppingsRepository = repo;
        }

        [HttpGet]
        public ActionResult<List<ToppingsModel>> Get()
        {
            return Ok(toppingsRepository.GetToppings());
        }
    }
}
