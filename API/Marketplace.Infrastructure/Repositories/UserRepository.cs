using Marketplace.Domain.Entities;
using Marketplace.Domain.Repositories;
using Marketplace.Infrastructure.Data;
using Marketplace.Infrastructure.Repositories.Base;

namespace Marketplace.Infrastructure.Repositories;

public class UserRepository : Repository<UserIdentity>, IUserRepository
{
    public UserRepository(DataContext dataContext) : base(dataContext)
    {
    }

    public async Task<UserIdentity?> GetUserById(Guid userId)
    {
        return await GetAsync(user => user.UserIdentityId == userId);
    } 
    
    public async Task<UserIdentity?> GetUserById(long userId)
    {
        return await GetAsync(user => user.Id == userId);
    }

    public async Task<UserIdentity?> GetUserByEmail(string email)
    {
        return await GetAsync(user => user.Email == email);
    }

    public async Task<List<UserIdentityRole>> GetUserRoles(Guid userId)
    {
        var user = await GetUserById(userId);

        if (user is null)
        {
            return new List<UserIdentityRole>();
        }

        return user.UserIdentityRoles.ToList();
    }

    public async void Create(UserIdentity user)
    {
        await _dataContext.AddAsync(user);
        await _dataContext.SaveChangesAsync();
    }
}