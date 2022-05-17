using bars_group_delivery.EntityFramework;
using bars_group_delivery.EntityFramework.Models;
using bars_group_delivery.WebAPI.Contracts;
using bars_group_delivery.WebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;

namespace bars_group_delivery.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController : ControllerBase
    {
        private readonly ApplicationContext _applicationContext;
        private readonly IOrderService _orderService;
        public CheckoutController(ApplicationContext applicationContext, IOrderService orderService)
        {
            _applicationContext = applicationContext;
            _orderService = orderService;
        }

        [Authorize]
        [HttpPost("[Action]")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderRequestModel order)
        {
            string? accountId = User.FindFirst("UserId")?.Value;
            
            if (accountId == null)
                return Forbid();

            try
            {
                var orderProducts = order.Products.Select(item=> new OrderProduct() { ProductId = item.Id, Quantity = item.Quantity }).ToList();
                var createdOrder = await _orderService.CreateOrder(accountId, order.Address, orderProducts);

                return CreatedAtAction(
                    nameof(CreateOrder),
                    new
                    {
                        id = createdOrder.Id,
                        status = createdOrder.OrderStatus,
                        price = createdOrder.TotalPrice,
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
        public async Task<IActionResult> GetTotalPrice(OrderRequestModel.Product[] orderProducts)
        {
            try
            {
                var _orderProducts = orderProducts.Select(item=> new OrderProduct() { ProductId = item.Id, Quantity = item.Quantity });
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
