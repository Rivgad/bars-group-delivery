using System.Text.Json.Serialization;

namespace bars_group_delivery.EntityFramework.Models
{
    public class OrderProduct
    {
        public int ProductId { get; set; }
        public int OrderId { get; set; }

        [JsonIgnore]
        public Order? Order { get; set; }

        [JsonIgnore]
        public Product? Product { get; set; }
        public int Quantity { get; set; }
    }
}
