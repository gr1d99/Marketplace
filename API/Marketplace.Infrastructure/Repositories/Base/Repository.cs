using System.Linq.Expressions;
using Marketplace.Domain.Entities.Base;
using Marketplace.Domain.Repositories.Base;
using Marketplace.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Marketplace.Infrastructure.Repositories.Base;

public class Repository<T> : IRepository<T> where T : Entity
{
    protected readonly DataContext _dataContext;

    public Repository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public virtual async Task<T?> GetByIdAsync(int id)
    {
        return await _dataContext.Set<T>().FindAsync(id);
    }

    public virtual Task<T?> GetAsync(Expression<Func<T, bool>> predicate)
    {
        return _dataContext.Set<T>().FirstOrDefaultAsync(predicate);
    }
}