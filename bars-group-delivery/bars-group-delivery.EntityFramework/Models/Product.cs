using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bars_group_delivery.EntityFramework.Models
{
    public class Product : Entity
    {
        public string Title { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public float? Weight { get; set; }
        public float? Kcal { get; set; }
        public float? Proteins { get; set; }
        public float? Carbs { get; set; }
        public float? Fats { get; set; }
        public byte[]? Photo { get; set; }

        [JsonIgnore]
        public IEnumerable<Category>? Categories { get; set; }
        public IEnumerable<Ingredient>? Ingredients { get; set; }
    }
}
