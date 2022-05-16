using System.Text.Json.Serialization;

namespace bars_group_delivery.EntityFramework.Models
{
    public class Ingredient : Entity
    {
        public string Title { get; set; } = "";

        public int ProductId { get; set; }

        [JsonIgnore]
        public Product? Product { get; set; }
    }
}
