using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcommerceChatbot.Migrations
{
    /// <inheritdoc />
    public partial class RemoveNavigationProperties4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetailBestellungen_Products_ProduktId",
                table: "DetailBestellungen");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailBestellungen_Products_ProduktId",
                table: "DetailBestellungen",
                column: "ProduktId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetailBestellungen_Products_ProduktId",
                table: "DetailBestellungen");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailBestellungen_Products_ProduktId",
                table: "DetailBestellungen",
                column: "ProduktId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
