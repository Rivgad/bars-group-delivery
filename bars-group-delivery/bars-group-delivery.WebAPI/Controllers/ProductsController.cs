using bars_group_delivery.EntityFramework;
using bars_group_delivery.EntityFramework.Models;
using bars_group_delivery.WebAPI.Contracts;
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
        public async Task<IActionResult> CreateProduct(ProductCreateDTO productModel)
        {
            Product newProduct = new Product()
            {
                CategoryId = productModel.CategoryId,
                Title = productModel.Title,
                Photo = productModel.Photo,
                Kcal = productModel.Kcal,
                Price = productModel.Price,
                Proteins = productModel.Proteins,
                Fats = productModel.Fats,
                Carbs = productModel.Carbs,
                Weight = productModel.Weight,
                Ingredients = productModel.IngredientModels?.Select(item => new Ingredient() { Title = item }).ToList()
            };

            try
            {
                var result = await _applicationContext.Products.AddAsync(newProduct);
                await _applicationContext.SaveChangesAsync();

                return CreatedAtAction(nameof(CreateProduct), new { id = result.Entity.Id, title = result.Entity.Title });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
