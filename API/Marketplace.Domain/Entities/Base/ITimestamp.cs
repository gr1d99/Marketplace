namespace Marketplace.Domain.Entities.Base;

public interface ITimestamp
{
    DateTime CreatedAt { get; set; }
    DateTime? UpdatedAt { get; set; }
    DateTime? DeletedAt { get; set; }
}