using System.Linq.Expressions;
using Marketplace.Domain.Entities.Base;

namespace Marketplace.Domain.Repositories.Base;

public interface IRepository<T> where T : Entity
{
    public Task<T?> GetByIdAsync(int id);
    public Task<T?> GetAsync(Expression<Func<T, bool>> predicate);
}