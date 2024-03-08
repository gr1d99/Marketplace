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
    public IQueryable<T> FindAll() => _dataContext.Set<T>().AsNoTracking();
    public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression) => 
        _dataContext.Set<T>().Where(expression).AsNoTracking();
    public void Create(T entity) => _dataContext.Set<T>().Add(entity);
    public void Update(T entity) => _dataContext.Set<T>().Update(entity);
    public void Delete(T entity) => _dataContext.Set<T>().Remove(entity);
    public void Save() => _dataContext.SaveChanges();
    public Task SaveAsync() => _dataContext.SaveChangesAsync();
}