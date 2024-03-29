using Marketplace.Domain.Entities.Base;

namespace Marketplace.Domain.Entities;

public class Category : Entity
{
    public new long Id { get; protected set; }
    public Guid CategoryId { get; set; }
    public string Name { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    public ICollection<Product> Products { get; } = new List<Product>();
}
