using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace bars_group_delivery.WebAPI.Contracts
{
    public class ProfileUpdateRequestModel
    {
        [JsonPropertyName("phone")]
        [RegularExpression(@"^([0-9]{11})$", ErrorMessage = "The phone field is not a valid phone number")]
        public string Phone { get; set; }

        [JsonPropertyName("name")]
        [RegularExpression(@"[\D]+")]
        public string Name { get; set; }
    }
}
