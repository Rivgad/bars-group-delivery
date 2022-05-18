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

    public static class RoleConstants
    {
        public const string Admin = "admin";
        public const string Employee = "employee";
        public const string User = "user";
    }
}
