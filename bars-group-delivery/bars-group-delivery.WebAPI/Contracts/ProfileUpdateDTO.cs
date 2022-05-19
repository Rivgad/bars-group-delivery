using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace bars_group_delivery.WebAPI.Contracts
{
    public class ProfileUpdateDTO
    {
        [JsonPropertyName("phone")]
        [Required]
        [RegularExpression(@"^([0-9]{11})$", ErrorMessage = "The phone field is not a valid phone number")]
        public string Phone { get; set; }

        [JsonPropertyName("name")]
        [RegularExpression(@"\b[^\d]+\b")]
        public string? Name { get; set; }
    }
}
