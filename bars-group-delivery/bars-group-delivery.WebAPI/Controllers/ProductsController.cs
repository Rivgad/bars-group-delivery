using bars_group_delivery.EntityFramework;
using bars_group_delivery.EntityFramework.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bars_group_delivery.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationContext _applicationContext;

        public ProductsController(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetByCategoryId(int categoryId)
        {
            var products = await _applicationContext.Categories
                .Include(c => c.Products)
                .ThenInclude(p => p.Ingredients)
                .Where(item => item.Id == categoryId)
                .SelectMany(item => item.Products).ToListAsync();

            return new JsonResult(products);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] Product product)
        {
            Product newProduct = new Product()
            {
                Title = product.Title,
                Photo = product.Photo,
                Kcal = product.Kcal,
                Price = product.Price,
                Proteins = product.Proteins,
                Fats = product.Fats,
                Carbs = product.Carbs,
                Categories = product.Categories,
                Ingredients = product.Ingredients?.Select(item=> new Ingredient() { Title=item.Title }).ToList(),
                Weight = product.Weight,
            };

            try
            {
                var result = await _applicationContext.Products.AddAsync(newProduct);
                await _applicationContext.SaveChangesAsync();

                return CreatedAtAction(nameof(CreateProduct), result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
