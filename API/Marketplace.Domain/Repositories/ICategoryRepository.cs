using Marketplace.Domain.Entities;

namespace Marketplace.Domain.Repositories;

public interface ICategoryRepository
{
    Task<Category?> Get(Guid categoryId);
    void UpdateCategory(Category userIdentity);
}
