using Marketplace.Domain.Entities.Base;

namespace Marketplace.Domain.Entities;

public class RefreshToken : Entity
{
    public new long Id { get; set; }
    public string Token { get; set; } = String.Empty;
    public long? UserId { get; set; } = null!;
    public DateTime? Expiry { get; set; } = null!;
    public UserIdentity? User { get; set; }
}
