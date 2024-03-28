using Marketplace.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Marketplace.Infrastructure.Data.Configurations;

public class VendorConfiguration : IEntityTypeConfiguration<Vendor>
{
    public void Configure(EntityTypeBuilder<Vendor> builder)
    {
        builder.ToTable("Vendors");
        builder.HasKey(vendor => vendor.Id);
        builder.Property(vendor => vendor.VendorId).HasDefaultValueSql("NEWID()");
        builder.Property(vendor => vendor.CreatedAt)
            .HasDefaultValueSql("GETUTCDATE()")
            .ValueGeneratedOnAdd();
        builder.Property(vendor => vendor.UpdatedAt)
            .HasDefaultValueSql("GETUTCDATE()")
            .ValueGeneratedOnAdd();
        builder
            .HasMany<VendorProduct>(vendor => vendor.VendorProducts)
            .WithOne(vendorProduct => vendorProduct.Vendor)
            .HasForeignKey(vendorProduct => vendorProduct.VendorId);
    }
}