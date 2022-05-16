using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace bars_group_delivery.EntityFramework.Models
{
    public class Order : Entity
    {
        [JsonIgnore]
        public Account? Account { get; set; }
        
        [JsonPropertyName("accountId")]
        public string AccountId { get; set; }
        
        [JsonPropertyName("address")]
        public string Address { get; set; }

        [JsonPropertyName("status")]
        public OrderStatus OrderStatus { get; set; }

        [JsonPropertyName("createTime")]
        public DateTime CreateDateTime { get; set; }
        
        [JsonPropertyName("resolveTime")]
        public DateTime? ResolveDateTime { get; set; }

        [JsonPropertyName("price")]
        public decimal? TotalPrice { get; set; }

        [Required]
        [MinLength(1)]
        [JsonPropertyName("products")]
        public IEnumerable<OrderProduct> OrderProducts { get; set; }
    }
}
