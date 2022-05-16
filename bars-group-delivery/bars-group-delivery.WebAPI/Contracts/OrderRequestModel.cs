using bars_group_delivery.EntityFramework.Models;
using System.Text.Json.Serialization;

namespace bars_group_delivery.WebAPI.Contracts
{
    public class OrderRequestModel
    {
        public class Product
        {
            [JsonPropertyName("id")]
            public int Id { get; set; }

            [JsonPropertyName("quantity")]
            public int Quantity { get; set; }
        }
        [JsonPropertyName("address")]
        public string Address { get; set; }
        
        [JsonPropertyName("comment")]
        public string Comment { get; set; }

        [JsonPropertyName("products")]
        public Product[] Products { get; set; }
    }
    
}
