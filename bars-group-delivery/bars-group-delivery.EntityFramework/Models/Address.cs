namespace bars_group_delivery.EntityFramework.Models
{
    public class Address : Entity
    {
        public string? City { get; set; }
        public string? Street { get; set; }
        public string? House { get; set; }
        public int? Entrance { get; set; }
        public string? InterCom { get; set; }
        public int? Floor { get; set; }
        public int? Flat { get; set; }
        public Account Account { get; set; }
    }
}
