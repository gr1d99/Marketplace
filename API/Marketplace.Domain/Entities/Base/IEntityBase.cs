namespace Marketplace.Domain.Entities.Base;

public interface IEntityBase<Tid>
{
    Tid Id { get; }
}