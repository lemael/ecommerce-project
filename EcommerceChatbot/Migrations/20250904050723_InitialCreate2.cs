using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EcommerceChatbot.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bestellungen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    KundeId = table.Column<int>(type: "integer", nullable: false),
                    DateBestellung = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Total = table.Column<decimal>(type: "numeric(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bestellungen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bestellungen_Users_KundeId",
                        column: x => x.KundeId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetailBestellungen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BestellungId = table.Column<int>(type: "integer", nullable: false),
                    ProduktId = table.Column<int>(type: "integer", nullable: false),
                    Menge = table.Column<int>(type: "integer", nullable: false),
                    Preis = table.Column<decimal>(type: "numeric(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailBestellungen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailBestellungen_Bestellungen_BestellungId",
                        column: x => x.BestellungId,
                        principalTable: "Bestellungen",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetailBestellungen_Products_ProduktId",
                        column: x => x.ProduktId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Zahlungen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BestellungId = table.Column<int>(type: "integer", nullable: false),
                    DateZahlung = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Summe = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zahlungen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Zahlungen_Bestellungen_BestellungId",
                        column: x => x.BestellungId,
                        principalTable: "Bestellungen",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bestellungen_KundeId",
                table: "Bestellungen",
                column: "KundeId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailBestellungen_BestellungId",
                table: "DetailBestellungen",
                column: "BestellungId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailBestellungen_ProduktId",
                table: "DetailBestellungen",
                column: "ProduktId");

            migrationBuilder.CreateIndex(
                name: "IX_Zahlungen_BestellungId",
                table: "Zahlungen",
                column: "BestellungId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetailBestellungen");

            migrationBuilder.DropTable(
                name: "Zahlungen");

            migrationBuilder.DropTable(
                name: "Bestellungen");
        }
    }
}
