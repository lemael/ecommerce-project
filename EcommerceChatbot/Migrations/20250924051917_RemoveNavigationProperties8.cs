using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcommerceChatbot.Migrations
{
    /// <inheritdoc />
    public partial class RemoveNavigationProperties8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetailBestellungen_Products_ProduktId",
                table: "DetailBestellungen");

            migrationBuilder.DropForeignKey(
                name: "FK_DetailBestellungen_Products_ProduktId1",
                table: "DetailBestellungen");

            migrationBuilder.DropIndex(
                name: "IX_DetailBestellungen_ProduktId1",
                table: "DetailBestellungen");

            migrationBuilder.DropColumn(
                name: "ProduktId1",
                table: "DetailBestellungen");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailBestellungen_Products_ProduktId",
                table: "DetailBestellungen",
                column: "ProduktId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetailBestellungen_Products_ProduktId",
                table: "DetailBestellungen");

            migrationBuilder.AddColumn<int>(
                name: "ProduktId1",
                table: "DetailBestellungen",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DetailBestellungen_ProduktId1",
                table: "DetailBestellungen",
                column: "ProduktId1");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailBestellungen_Products_ProduktId",
                table: "DetailBestellungen",
                column: "ProduktId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DetailBestellungen_Products_ProduktId1",
                table: "DetailBestellungen",
                column: "ProduktId1",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
