using bars_group_delivery.EntityFramework;
using bars_group_delivery.EntityFramework.Models;
using bars_group_delivery.WebAPI.Contracts;
using bars_group_delivery.WebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bars_group_delivery.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationContext _applicationContext;
        private readonly IOrderService _orderService;
        public OrdersController(ApplicationContext applicationContext, IOrderService orderService)
        {
            _applicationContext = applicationContext;
            _orderService = orderService;
        }

        [Authorize]
        [HttpGet("[Action]")]
        public async Task<IActionResult> UserOrders()
        {
            string? accountId = User.FindFirst("UserId")?.Value;

            if (accountId == null)
                return Forbid();

            var orders = await _orderService.GetUserOrders(accountId);

            return Ok(orders);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderCreateDTO order)
        {
            string? accountId = User.FindFirst("UserId")?.Value;

            if (accountId == null)
                return Forbid();

            try
            {
                var orderProducts = order.Products.Select(item => new OrderProduct() { ProductId = item.Id, Quantity = item.Quantity }).ToList();
                var createdOrder = await _orderService.CreateOrder(accountId, order.Address, orderProducts);

                return CreatedAtAction(
                    nameof(CreateOrder),
                    new
                    {
                        id = createdOrder.Id,
                        status = createdOrder.OrderStatus,
                        price = createdOrder.TotalPrice,
                        address=createdOrder.Address,
                        products = createdOrder.OrderProducts.Select(item=> new {productId=item.ProductId, quantity=item.Quantity}).ToList(),
                        creationTime = createdOrder.CreateDateTime
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "user")]
        [HttpGet("[Action]")]
        public async Task<IActionResult> GetTotalPrice(OrderCreateDTO.Product[] orderProducts)
        {
            try
            {
                var _orderProducts = orderProducts.Select(item => new OrderProduct() { ProductId = item.Id, Quantity = item.Quantity });
                var result = await _orderService.CalculateAndValidateOrderPrice(_orderProducts);
                return Ok(new { price = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
