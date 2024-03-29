using Marketplace.Domain.Entities.Base;

namespace Marketplace.Domain.Entities;

public class Notification : Entity
{
    public new long Id { get; protected set; }
    public long UserIdentityId { get; set; }
    public bool IsSent { get; set; }
    public UserIdentity? UserIdentity { get; set; }
}
