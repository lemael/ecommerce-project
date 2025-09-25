using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcommerceChatbot.Migrations
{
    /// <inheritdoc />
    public partial class RemoveNavigationProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bestellungen_Users_KundeId",
                table: "Bestellungen");

            migrationBuilder.DropIndex(
                name: "IX_Bestellungen_KundeId",
                table: "Bestellungen");

            migrationBuilder.AddColumn<int>(
                name: "BestellungId1",
                table: "DetailBestellungen",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProduktId1",
                table: "DetailBestellungen",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Bestellungen",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_DetailBestellungen_BestellungId1",
                table: "DetailBestellungen",
                column: "BestellungId1");

            migrationBuilder.CreateIndex(
                name: "IX_DetailBestellungen_ProduktId1",
                table: "DetailBestellungen",
                column: "ProduktId1");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailBestellungen_Bestellungen_BestellungId1",
                table: "DetailBestellungen",
                column: "BestellungId1",
                principalTable: "Bestellungen",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetailBestellungen_Products_ProduktId1",
                table: "DetailBestellungen",
                column: "ProduktId1",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetailBestellungen_Bestellungen_BestellungId1",
                table: "DetailBestellungen");

            migrationBuilder.DropForeignKey(
                name: "FK_DetailBestellungen_Products_ProduktId1",
                table: "DetailBestellungen");

            migrationBuilder.DropIndex(
                name: "IX_DetailBestellungen_BestellungId1",
                table: "DetailBestellungen");

            migrationBuilder.DropIndex(
                name: "IX_DetailBestellungen_ProduktId1",
                table: "DetailBestellungen");

            migrationBuilder.DropColumn(
                name: "BestellungId1",
                table: "DetailBestellungen");

            migrationBuilder.DropColumn(
                name: "ProduktId1",
                table: "DetailBestellungen");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Bestellungen",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.CreateIndex(
                name: "IX_Bestellungen_KundeId",
                table: "Bestellungen",
                column: "KundeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bestellungen_Users_KundeId",
                table: "Bestellungen",
                column: "KundeId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
