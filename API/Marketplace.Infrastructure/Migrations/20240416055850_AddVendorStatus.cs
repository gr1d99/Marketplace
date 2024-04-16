using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Marketplace.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddVendorStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "VendorStatusId",
                table: "Vendors",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "VendorStatus",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VendorStatusId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VendorStatus", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Vendors_VendorStatusId",
                table: "Vendors",
                column: "VendorStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vendors_VendorStatus_VendorStatusId",
                table: "Vendors",
                column: "VendorStatusId",
                principalTable: "VendorStatus",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vendors_VendorStatus_VendorStatusId",
                table: "Vendors");

            migrationBuilder.DropTable(
                name: "VendorStatus");

            migrationBuilder.DropIndex(
                name: "IX_Vendors_VendorStatusId",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "VendorStatusId",
                table: "Vendors");
        }
    }
}
