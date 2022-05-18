using System.ComponentModel;

namespace bars_group_delivery.EntityFramework.Extensions
{
    public static class EnumExtensions
    {
        public static string GetDescriptionAttribute(this Enum value)
        {
            var type = value.GetType();
            var memberInfo = type.GetMember(value.ToString());
            var attributes = memberInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);

            return attributes.Length > 0
              ? ((DescriptionAttribute)attributes[0]).Description
              : value.ToString();
        }
    }

}
