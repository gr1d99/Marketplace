﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Marketplace.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddProductStatusSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ProductStatuses",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1001L, "INACTIVE" },
                    { 1002L, "ACTIVE" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ProductStatuses",
                keyColumn: "Id",
                keyValue: 1001L);

            migrationBuilder.DeleteData(
                table: "ProductStatuses",
                keyColumn: "Id",
                keyValue: 1002L);
        }
    }
}
