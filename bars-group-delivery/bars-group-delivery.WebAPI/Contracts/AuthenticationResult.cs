using System.Text.Json.Serialization;

namespace bars_group_delivery.WebAPI.Contracts
{
    public class AuthenticationResult
    {
        public AuthenticationResult(string accessToken, string phone, string[] roles, string name = "")
        {
            AccessToken = accessToken;
            Phone = phone;
            Name = name;
            Roles = roles;
        }

        [JsonPropertyName("accessToken")]
        public string AccessToken { get; set; }
        
        [JsonPropertyName("phone")]
        public string Phone { get; set; }
        
        [JsonPropertyName("name")]
        public string? Name { get; set; }
        
        [JsonPropertyName("roles")]
        public string[] Roles { get; set; }
        
    }
}
