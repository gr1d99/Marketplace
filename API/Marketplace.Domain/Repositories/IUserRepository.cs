using Marketplace.Domain.Entities;

namespace Marketplace.Domain.Repositories;

public interface IUserRepository : IDisposable
{
    IEnumerable<UserIdentity> GetUserIdentities();

    IQueryable<UserIdentity> GetUserIdentityById(Guid userIdentityId);
    IQueryable<UserIdentity> GetUserIdentityById(long id);
    IQueryable<UserIdentity> GetUserIdentityByEmail(string email);
    void InsertUserIdentity(UserIdentity userIdentity);
    void DeleteUserIdentity(long id);
    void DeleteUserIdentity(Guid userIdentityId);
    void UpdateUserIdentity(UserIdentity userIdentity);
    void Save();
    Task SaveAsync();
    // public Task<UserIdentity?> GetUserById(Guid userId);
    // public Task<UserIdentity?> GetUserById(long userId);
    // public Task<UserIdentity?> GetUserByEmail(string email);
    // public Task<List<UserIdentityRole>> GetUserRoles(Guid userId);
    // public void Create(UserIdentity user);
}
