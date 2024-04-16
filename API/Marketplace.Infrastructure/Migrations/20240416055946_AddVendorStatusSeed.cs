using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Marketplace.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddVendorStatusSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "VendorStatus",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "Name", "UpdatedAt", "VendorStatusId" },
                values: new object[,]
                {
                    { 1001L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "PENDING APPROVAL", null, new Guid("00000000-0000-0000-0000-000000000000") },
                    { 1002L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "APPROVED", null, new Guid("00000000-0000-0000-0000-000000000000") },
                    { 1003L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "SUSPENDED", null, new Guid("00000000-0000-0000-0000-000000000000") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "VendorStatus",
                keyColumn: "Id",
                keyValue: 1001L);

            migrationBuilder.DeleteData(
                table: "VendorStatus",
                keyColumn: "Id",
                keyValue: 1002L);

            migrationBuilder.DeleteData(
                table: "VendorStatus",
                keyColumn: "Id",
                keyValue: 1003L);
        }
    }
}
