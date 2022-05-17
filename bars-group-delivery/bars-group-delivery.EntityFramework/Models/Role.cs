using System.ComponentModel;

namespace bars_group_delivery.EntityFramework.Models
{
    public enum Role
    {
        [Description("user")]
        User = 0,
        [Description("admin")]
        Admin = 1,
        [Description("employee")]
        Employee = 2,
    }
}
