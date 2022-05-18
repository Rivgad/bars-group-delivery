using bars_group_delivery.EntityFramework;
using bars_group_delivery.EntityFramework.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bars_group_delivery.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        public ApplicationContext _applicationContext { get; set; }

        public CategoriesController(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        [HttpGet]
        public IEnumerable<Category> GetAll()
        {
            var categories = _applicationContext.Categories;
            return categories;
        }

        [Authorize(Roles = $"{RoleConstants.Admin},{RoleConstants.Employee}")]
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] Category category)
        {
            Category newCategory = new Category()
            {
                Photo = category.Photo,
                Title = category.Title,
            };

            try
            {
                var result = await _applicationContext.Categories.AddAsync(newCategory);
                await _applicationContext.SaveChangesAsync();

                return CreatedAtAction(nameof(CreateCategory), new { id=result.Entity.Id, title=result.Entity.Title });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
