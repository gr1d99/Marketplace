using Marketplace.Domain.Entities.Base;

namespace Marketplace.Domain.Entities;

public class Role : Entity
{
    public new long Id { get; set; }
    public required string Name { get; set; }
    public string Description { get; set; } = String.Empty;

    public ICollection<UserIdentityRole> UserIdentityRoles { get; } = new List<UserIdentityRole>();
}
