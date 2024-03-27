using Marketplace.Domain.Entities;
using Marketplace.Domain.Repositories;
using Marketplace.Infrastructure.Data;
using Marketplace.Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Marketplace.Infrastructure.Repositories;

public class CategoryRepository : Repository<Category>, ICategoryRepository
{
    public CategoryRepository(DataContext dataContext) : base(dataContext)
    {
    }

    public Task<Category?> Get(Guid categoryId)
    {
        return Task.FromResult(
            FindByCondition(category => category.CategoryId == categoryId).FirstOrDefaultAsync().Result);
    }

    public void UpdateCategory(Category category)
    {
        _dataContext.Categories.Entry(category).State = EntityState.Modified;
    }
    
    
}