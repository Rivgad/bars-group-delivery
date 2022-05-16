using bars_group_delivery.EntityFramework.Models;
using System.Text.Json.Serialization;

namespace bars_group_delivery.WebAPI.Contracts
{
    public class OrderRequestModel
    {
        [JsonPropertyName("address")]
        public string Address { get; set; }
        
        [JsonPropertyName("products")]
        public IEnumerable<OrderProduct> OrderProducts { get; set; }
    }
    
}
