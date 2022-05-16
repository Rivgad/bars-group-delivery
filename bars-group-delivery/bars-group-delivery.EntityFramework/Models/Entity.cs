using System.Text.Json.Serialization;

namespace bars_group_delivery.EntityFramework.Models
{
    public abstract class Entity
    {
        [JsonPropertyOrder(-100)]
        [JsonPropertyName("id")]
        public int Id { get; set; }
    }
}
