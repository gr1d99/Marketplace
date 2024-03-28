using Marketplace.Domain.Entities.Base;

namespace Marketplace.Domain.Entities;

public class Notification : Timestamp
{
    public long Id { get; protected set; }
    public long UserIdentityId { get; set; }
    public bool IsSent { get; set; } = false;
    public UserIdentity? UserIdentity { get; set; } = null!;
}
