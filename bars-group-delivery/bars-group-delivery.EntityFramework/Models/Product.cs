using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace bars_group_delivery.EntityFramework.Models
{
    public class Product : Entity
    {
        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("price")]
        public decimal Price { get; set; }

        [JsonPropertyName("weight")]
        public float? Weight { get; set; }

        [JsonPropertyName("kcal")]
        public float? Kcal { get; set; }

        [JsonPropertyName("proteins")]
        public float? Proteins { get; set; }

        [JsonPropertyName("carbs")]
        public float? Carbs { get; set; }

        [JsonPropertyName("fats")]
        public float? Fats { get; set; }

        [JsonPropertyName("photo")]
        public byte[]? Photo { get; set; }

        [JsonPropertyName("ingredients")]
        public ICollection<Ingredient>? Ingredients { get; set; }

        [Required]
        [JsonPropertyName("categoryId")]
        public int CategoryId { get; set; }

        [JsonIgnore]
        public Category? Category { get; set; }
    }
}
