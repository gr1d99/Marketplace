namespace Marketplace.Domain.Entities.Base;

public abstract class EntityBase<Tid> : IEntityBase<Tid>
{
    public virtual Tid Id { get; protected set; }
    public virtual DateTime CreatedAt { get; set; }
    public virtual DateTime? UpdatedAt { get; set; }
}
