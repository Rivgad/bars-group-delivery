using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace bars_group_delivery.WebAPI.Contracts
{
    public class AuthenticationModel
    {
        [Required]
        [JsonPropertyName("phone")]
        [RegularExpression(@"^([0-9]{11})$", ErrorMessage = "The phone field is not a valid phone number")]
        public string Phone { get; set; }

        [Required]
        [JsonPropertyName("password")]
        [MinLength(4)]
        public string Password { get; set; }
    }
}
