using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace bars_group_delivery.EntityFramework.Models
{
    public class Address : Entity
    {
        [Required]
        [JsonPropertyOrder(0)]
        [JsonPropertyName("accountId")]
        public string? AccountId { get; set; }

        [JsonPropertyOrder(1)]
        [JsonPropertyName("city")]
        public string? City { get; set; }

        [JsonPropertyOrder(2)]
        [JsonPropertyName("street")]
        public string? Street { get; set; }

        [JsonPropertyOrder(3)]
        [JsonPropertyName("house")]
        public string? House { get; set; }

        [JsonPropertyOrder(4)]
        [JsonPropertyName("entrance")]
        public int? Entrance { get; set; }

        [JsonPropertyOrder(5)]
        [JsonPropertyName("intercom")]
        public string? InterCom { get; set; }

        [JsonPropertyOrder(6)]
        [JsonPropertyName("floot")]
        public int? Floor { get; set; }

        [JsonPropertyOrder(7)]
        [JsonPropertyName("flat")]
        public int? Flat { get; set; }

        [JsonIgnore]
        public Account Account { get; set; }
    }
}
