using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjApi.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Producent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Model = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Typ = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RokProdukcji = table.Column<int>(type: "int", nullable: false),
                    KrajProdukcji = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrzebiegKm = table.Column<int>(type: "int", nullable: false),
                    MocKM = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cars");
        }
    }
}
