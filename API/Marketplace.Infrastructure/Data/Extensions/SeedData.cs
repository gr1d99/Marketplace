using Marketplace.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Marketplace.Infrastructure.Data.Extensions;

public static class SeedData
{
    public static void SeedRoles(this ModelBuilder builder)
    {
        builder.Entity<Role>().HasData(
            new Role() { Id = 10001, Name = "USER", Description = "Default Role for all users" },
            new Role() { Id = 10002, Name = "VENDOR", Description = "Default Role for all vendors" },
            new Role() { Id = 10003, Name = "ADMIN", Description = "Default Role for all administrators" });
    }

    public static void SeedProductStatus(this ModelBuilder builder)
    {
        builder.Entity<ProductStatus>().HasData(
            new ProductStatus { Id = 1001, Name = "INACTIVE", ProductStatusId = new Guid() },
            new ProductStatus { Id = 1002, Name = "ACTIVE", ProductStatusId = new Guid() });
    }
    
    public static void SeedVendorStatus(this ModelBuilder builder)
    {
        builder.Entity<VendorStatus>().HasData(
            new VendorStatus() { Id = 1001, Name = "PENDING APPROVAL", VendorStatusId = new Guid() },
            new VendorStatus() { Id = 1002, Name = "APPROVED", VendorStatusId = new Guid() },
            new VendorStatus() { Id = 1003, Name = "SUSPENDED", VendorStatusId = new Guid() });
    }
}
