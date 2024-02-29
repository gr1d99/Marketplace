using Marketplace.Domain.Entities;

namespace Marketplace.Domain.Repositories;

public interface IUserRepository
{
    public Task<UserIdentity?> GetUserById(Guid userId);
    public Task<List<UserIdentityRole>> GetUserRoles(Guid userId);
}
