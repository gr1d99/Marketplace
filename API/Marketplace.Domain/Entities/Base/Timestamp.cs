namespace Marketplace.Domain.Entities.Base;

public abstract class Timestamp : ITimestamp
{
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}