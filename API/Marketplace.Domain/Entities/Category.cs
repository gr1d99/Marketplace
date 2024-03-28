using Marketplace.Domain.Entities.Base;

namespace Marketplace.Domain.Entities;

public class Category :  Timestamp
{
    public long Id { get; protected set; }
    public Guid CategoryId { get; set; }
    public string Name { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    public DateTime? DeletedAt { get; set; }
    public ICollection<Product> Products { get; } = new List<Product>();
}
