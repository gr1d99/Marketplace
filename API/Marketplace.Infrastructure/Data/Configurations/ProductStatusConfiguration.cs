using Marketplace.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Marketplace.Domain.Data.Configurations;

public class ProductStatusConfiguration : IEntityTypeConfiguration<ProductStatus>
{
    public void Configure(EntityTypeBuilder<ProductStatus> builder)
    {
        builder
            .ToTable("ProductStatuses")
            .HasKey(t => t.Id);
        builder
            .Property(t => t.ProductStatusId)
            .HasDefaultValueSql("NEWID()");
        builder
            .HasMany(t => t.Products)
            .WithOne(t => t.ProductStatus)
            .HasForeignKey(t => t.ProductStatusId)
            .IsRequired();
        builder.HasData(
            new ProductStatus { Id = 1001, Name = "INACTIVE", ProductStatusId = new Guid() },
            new ProductStatus { Id = 1002, Name = "ACTIVE", ProductStatusId = new Guid() });
    }
}
