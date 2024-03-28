using Marketplace.Domain.Entities.Base;

namespace Marketplace.Domain.Entities;

// Principal(parent) to product
public class ProductStatus : Entity
{
    public new long Id { get; set; }
    public Guid ProductStatusId { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<Product> Products { get; } = new List<Product>();
}
