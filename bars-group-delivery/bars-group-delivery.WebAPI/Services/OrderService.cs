using bars_group_delivery.EntityFramework;
using bars_group_delivery.EntityFramework.Models;
using bars_group_delivery.WebAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace bars_group_delivery.WebAPI.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationContext _applicationContext;

        public OrderService(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        public async Task<decimal> CalculateAndValidateOrderPrice(IEnumerable<OrderProduct> orderProducts)
        {
            var productsQuantityDict = orderProducts
                .GroupBy(item => item.ProductId)
                .ToDictionary(t => t.Key, t => t.Select(item => item.Quantity).Sum());

            try
            {
                IEnumerable<int>? productIds = productsQuantityDict.Select(item => item.Key);
                var productPriceDict = await _applicationContext
                    .Products
                    .Where(item => productIds.Contains(item.Id) == true)
                    .ToDictionaryAsync(item => item.Id, item => item.Price);

                if (productPriceDict.Count() != productsQuantityDict.Count)
                {
                    var products = productsQuantityDict
                        .Select(item => item.Key)
                        .Except(productPriceDict.Select(item => item.Key));
                    var productsStr = string.Join(",", products.Select(item => $"productId: {item}"));
                    throw new Exception($"Current products don't exist: {productsStr}");
                }

                decimal totalPrice = productPriceDict.Select(item => item.Value * productsQuantityDict[item.Key]).Sum();

                return totalPrice;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public bool VerifyOrderProducts(IEnumerable<OrderProduct> orderProducts)
        {
            IEnumerable<int>? productIds = orderProducts.Select(item => item.ProductId);
            IQueryable<Product>? products = _applicationContext
                .Products
                .Where(item => productIds.Contains(item.Id) == true);

            if (products.Count() != productIds.Count())
                return false;

            return true;
        }
        public Task ChangeOrderStatus(int id, OrderStatus status)
        {
            throw new NotImplementedException();
        }

        public async Task<Order> CreateOrder(string accountId, string address, string comment, IEnumerable<OrderProduct> orderProducts)
        {
            if (orderProducts == null)
                throw new ArgumentNullException(nameof(orderProducts));

            if (!orderProducts.Any())
                throw new Exception();

            try
            {
                var totalPrice = await CalculateAndValidateOrderPrice(orderProducts);
                Order newOrder = new()
                {
                    AccountId = accountId,
                    Address = address,
                    TotalPrice = totalPrice,
                    OrderProducts = orderProducts
                        .GroupBy(item => item.ProductId)
                        .Select(item => new OrderProduct()
                        {
                            ProductId = item.Key,
                            Quantity = item.Select(item => item.Quantity).Sum(),
                        }).ToList(),
                    CreateDateTime = DateTime.Now.ToUniversalTime(),
                    OrderStatus = OrderStatus.Created,
                    Comment = comment ?? string.Empty
                };

                var result = await _applicationContext.Orders.AddAsync(newOrder);
                await _applicationContext.SaveChangesAsync();

                return result.Entity;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public async Task<Order?> GetOrder(int id)
        {
            var result = await _applicationContext
                .Orders
                .Include(item => item.OrderProducts)
                .ThenInclude(item => item.Product)
                .FirstOrDefaultAsync(item => item.Id == id);

            return result;
        }

        public async Task<IEnumerable<Order>> GetUserOrders(string accountId)
        {
            var result = await _applicationContext
                .Orders
                .Include(item => item.OrderProducts)
                .ThenInclude(item => item.Product)
                .Where(item => item.AccountId == accountId)
                .ToListAsync();

            return result;
        }
    }
}
