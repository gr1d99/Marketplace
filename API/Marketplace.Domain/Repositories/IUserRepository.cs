using Marketplace.Domain.Entities;

namespace Marketplace.Domain.Repositories;

public interface IUserRepository
{
    public Task<UserIdentity?> GetUserById(Guid userId);
    public Task<UserIdentity?> GetUserById(long userId);
    public Task<UserIdentity?> GetUserByEmail(string email);
    public Task<List<UserIdentityRole>> GetUserRoles(Guid userId);
    public void Create(UserIdentity user);
}
