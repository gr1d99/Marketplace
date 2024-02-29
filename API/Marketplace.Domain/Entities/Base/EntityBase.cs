namespace Marketplace.Domain.Entities.Base;

public abstract class EntityBase<Tid> : IEntityBase<Tid>
{
    public virtual Tid Id { get; protected set; }
}
