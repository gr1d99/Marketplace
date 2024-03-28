namespace Marketplace.Domain.Entities;

public class UserIdentityRole
{
    public long RoleId { get; set; }
    public long UserIdentityId { get; set; }

    public Role Role { get; set; } = null!;
    public UserIdentity UserIdentity { get; set; } = null!;
}
