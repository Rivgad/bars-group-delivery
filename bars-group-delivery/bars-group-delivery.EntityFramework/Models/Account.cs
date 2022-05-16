using Microsoft.AspNetCore.Identity;
using System.Collections;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bars_group_delivery.EntityFramework.Models
{
    public class Account : IdentityUser
    {
        public string? Name { get; set; }
        [JsonIgnore]
        public IEnumerable<Order>? Orders { get; set; }

        [JsonIgnore]
        public IEnumerable<Address>? Addresses { get; set; }
    }
}
