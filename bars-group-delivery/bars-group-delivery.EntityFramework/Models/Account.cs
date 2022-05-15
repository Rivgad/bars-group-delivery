using Microsoft.AspNetCore.Identity;
using System.Collections;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bars_group_delivery.EntityFramework.Models
{
    public class Account : IdentityUser
    {

        [JsonIgnore]
        public IEnumerable<Order> Orders { get; set; }
    }
}
