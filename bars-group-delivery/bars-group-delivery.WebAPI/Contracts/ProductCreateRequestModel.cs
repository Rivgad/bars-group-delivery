using System.Text.Json.Serialization;

namespace bars_group_delivery.WebAPI.Contracts
{
    public class ProductCreateRequestModel
    {
        [JsonPropertyName("title")]
        public string Title { get; set; }

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
        public string[] IngredientModels { get; set; }

        [JsonPropertyName("categoryId")]
        public int CategoryId { get; set; }
    }
    
}
