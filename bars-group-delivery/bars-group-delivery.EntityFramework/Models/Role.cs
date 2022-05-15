using System.ComponentModel;

namespace bars_group_delivery.EntityFramework.Models
{
    public enum Role
    {
        [Description("User")]
        User = 0,
        [Description("Admin")]
        Admin = 1,
    }
}
