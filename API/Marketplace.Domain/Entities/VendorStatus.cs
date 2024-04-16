using Marketplace.Domain.Entities.Base;

namespace Marketplace.Domain.Entities;

public class VendorStatus :  Entity
{
    public new long Id { get; set; }
    public Guid VendorStatusId { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<Vendor> Vendors { get; } = new List<Vendor>();
}
