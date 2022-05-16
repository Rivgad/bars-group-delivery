using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace bars_group_delivery.EntityFramework.Models
{
    public class OrderProduct
    {
        [Range(1, int.MaxValue)]
        [JsonPropertyName("productId")]
        public int ProductId { get; set; }

        [JsonPropertyName("orderId")]
        public int OrderId { get; set; }

        [JsonIgnore]
        public Order? Order { get; set; }

        [JsonIgnore]
        public Product? Product { get; set; }

        [Range(1,int.MaxValue)]
        [JsonPropertyName("quantity")]
        public int Quantity { get; set; }
    }
}
