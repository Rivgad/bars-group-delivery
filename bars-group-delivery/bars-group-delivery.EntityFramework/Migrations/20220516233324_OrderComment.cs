using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bars_group_delivery.EntityFramework.Migrations
{
    public partial class OrderComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Orders",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "Orders");
        }
    }
}
