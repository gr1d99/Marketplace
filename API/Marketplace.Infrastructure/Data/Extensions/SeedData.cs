using Marketplace.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Marketplace.Infrastructure.Data.Extensions;

public static class SeedData
{
    public static void SeedRoles(this ModelBuilder builder)
    {
        builder.Entity<Role>().HasData(new Role()
            { Id = 10001, Name = "USER", Description = "Default Role for all Users" });
    }

    public static void SeedProductStatus(this ModelBuilder builder)
    {
        builder.Entity<ProductStatus>().HasData(
            new ProductStatus { Id = 1001, Name = "INACTIVE", ProductStatusId = new Guid() },
            new ProductStatus { Id = 1002, Name = "ACTIVE", ProductStatusId = new Guid() });
    }
}
