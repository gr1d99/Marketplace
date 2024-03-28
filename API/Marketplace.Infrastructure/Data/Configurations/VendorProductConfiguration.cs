using Marketplace.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Marketplace.Infrastructure.Data.Configurations;

public class VendorProductConfiguration : IEntityTypeConfiguration<VendorProduct>
{
    public void Configure(EntityTypeBuilder<VendorProduct> builder)
    {
        builder.HasKey(vendorProduct => new
        {
            vendorProduct.VendorId,
            vendorProduct.ProductId
        });
    }
}