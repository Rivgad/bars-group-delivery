using bars_group_delivery.EntityFramework.Models;

namespace bars_group_delivery.WebAPI.Services.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrder(string accountId, string address, string comment, IEnumerable<OrderProduct> orderProducts);
        Task<decimal> CalculateAndValidateOrderPrice(IEnumerable<OrderProduct> orderProducts);
        Task<Order?> GetOrder(int id);
        Task<IEnumerable<Order>> GetUserOrders(string accountId);
        Task ChangeOrderStatus(int id, OrderStatus status);
    }
}
