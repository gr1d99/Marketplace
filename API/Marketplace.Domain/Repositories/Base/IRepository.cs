using System.Linq.Expressions;
using Marketplace.Domain.Entities.Base;

namespace Marketplace.Domain.Repositories.Base;

public interface IRepository<T> where T : Entity
{
    IQueryable<T> FindAll();
    IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
    void Create(T entity);
    void Update(T entity);
    void Delete(T entity);
}