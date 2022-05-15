using System.Text.Json.Serialization;

namespace bars_group_delivery.EntityFramework.Models
{
    public class Order : Entity
    {

        [JsonIgnore]
        public Account? Account { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public DateTime CreateDateTime { get; set; }
        public DateTime? ResolveDateTime { get; set; }
        public IEnumerable<OrderProduct>? OrderProducts { get; set; }
    }
}
