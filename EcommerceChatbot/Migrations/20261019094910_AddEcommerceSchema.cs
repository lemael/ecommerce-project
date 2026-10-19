using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcommerceChatbot.Migrations
{
    /// <inheritdoc />
    public partial class AddEcommerceSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "ecommerce");

            migrationBuilder.RenameTable(
                name: "Zahlungen",
                newName: "Zahlungen",
                newSchema: "ecommerce");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "Users",
                newSchema: "ecommerce");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "Products",
                newSchema: "ecommerce");

            migrationBuilder.RenameTable(
                name: "DetailBestellungen",
                newName: "DetailBestellungen",
                newSchema: "ecommerce");

            migrationBuilder.RenameTable(
                name: "Bestellungen",
                newName: "Bestellungen",
                newSchema: "ecommerce");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "Zahlungen",
                schema: "ecommerce",
                newName: "Zahlungen");

            migrationBuilder.RenameTable(
                name: "Users",
                schema: "ecommerce",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "Products",
                schema: "ecommerce",
                newName: "Products");

            migrationBuilder.RenameTable(
                name: "DetailBestellungen",
                schema: "ecommerce",
                newName: "DetailBestellungen");

            migrationBuilder.RenameTable(
                name: "Bestellungen",
                schema: "ecommerce",
                newName: "Bestellungen");
        }
    }
}
