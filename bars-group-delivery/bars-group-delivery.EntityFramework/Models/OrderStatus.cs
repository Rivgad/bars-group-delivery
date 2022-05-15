using System.ComponentModel;

namespace bars_group_delivery.EntityFramework.Models
{
    public enum OrderStatus
    {
        [Description("Создан")]
        Created = 0,
        [Description("Принят")]
        Accepted = 1,
        [Description("Отклонен")]
        Declined = 2,
        [Description("Завершен")]
        Done = 3,
    }
}
