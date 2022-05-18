using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bars_group_delivery.EntityFramework.Migrations
{
    public partial class AddressDeleteFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "House",
                table: "Addresses");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Addresses",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "House",
                table: "Addresses",
                type: "text",
                nullable: true);
        }
    }
}
