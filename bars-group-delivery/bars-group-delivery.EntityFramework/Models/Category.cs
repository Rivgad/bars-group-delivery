using System.Text.Json.Serialization;

namespace bars_group_delivery.EntityFramework.Models
{
    public class Category : Entity
    {
        [JsonPropertyName("title")]
        public string Title { get; set; } = "";

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [JsonPropertyName("photo")]
        public byte[]? Photo { get; set; }

        [JsonIgnore]
        public IEnumerable<Product> Products { get; set; } = Enumerable.Empty<Product>();
    }
}
