using System.ComponentModel;

namespace bars_group_delivery.EntityFramework.Models
{
    public enum OrderStatus
    {
        [Description("Создан")]
        Created = 0,

        [Description("Отклонен")]
        Declined = 1,

        [Description("Готовится")]
        InProgress = 2,

        [Description("Доставляется")]
        Delivering = 3,

        [Description("Завершен")]
        Delivered = 4,
    }
}
