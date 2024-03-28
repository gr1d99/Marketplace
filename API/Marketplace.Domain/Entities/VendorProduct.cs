namespace Marketplace.Domain.Entities;

public class VendorProduct
{
    public long VendorId { get; set; }
    public long ProductId { get; set; }
    public Vendor Vendor { get; set; } = null!;
    public Product Product { get; set; } = null!;
}