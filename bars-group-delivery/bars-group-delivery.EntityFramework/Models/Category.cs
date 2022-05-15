using System.Text.Json.Serialization;

namespace bars_group_delivery.EntityFramework.Models
{
    public class Category : Entity
    {
        public string Title { get; set; } = "";
        public byte[]? Photo { get; set; }

        [JsonIgnore]
        public IEnumerable<Product>? Products { get; set; }
    }
}
