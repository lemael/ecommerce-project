using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcommerceChatbot.Migrations
{
    /// <inheritdoc />
    public partial class RemoveNavigationProperties6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BestellungId1",
                table: "DetailBestellungen",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DetailBestellungen_BestellungId1",
                table: "DetailBestellungen",
                column: "BestellungId1");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailBestellungen_Bestellungen_BestellungId1",
                table: "DetailBestellungen",
                column: "BestellungId1",
                principalTable: "Bestellungen",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetailBestellungen_Bestellungen_BestellungId1",
                table: "DetailBestellungen");

            migrationBuilder.DropIndex(
                name: "IX_DetailBestellungen_BestellungId1",
                table: "DetailBestellungen");

            migrationBuilder.DropColumn(
                name: "BestellungId1",
                table: "DetailBestellungen");
        }
    }
}
