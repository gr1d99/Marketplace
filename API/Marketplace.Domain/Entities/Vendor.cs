using Marketplace.Domain.Entities.Base;

namespace Marketplace.Domain.Entities;

public class Vendor : Entity
{
    public override long Id { get; protected set; }
    public Guid VendorId { get; set; }
    public string Name { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    public long? UserIdentityId { get; set; }
    public UserIdentity? UserIdentity { get; set; }
    public long? VendorStatusId { get; set; }
    public VendorStatus? VendorStatus { get; set; }
    public ICollection<VendorProduct> VendorProducts { get; } = new List<VendorProduct>();
}