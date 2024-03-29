using Marketplace.Domain.Entities;
using Marketplace.Domain.Repositories;
using Marketplace.Infrastructure.Data;
using Marketplace.Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Marketplace.Infrastructure.Repositories;

public class UserRepository : Repository<UserIdentity>, IUserRepository
{
    public UserRepository(DataContext dataContext) : base(dataContext)
    {
    }

    // public async Task<UserIdentity?> GetUserById(Guid userId)
    // {
    //     return await GetAsync(user => user.UserIdentityId == userId);
    // } 
    //
    // public async Task<UserIdentity?> GetUserById(long userId)
    // {
    //     return await GetAsync(user => user.Id == userId);
    // }
    //
    // public async Task<UserIdentity?> GetUserByEmail(string email)
    // {
    //     return await GetAsync(user => user.Email == email);
    // }
    //
    // public async Task<List<UserIdentityRole>> GetUserRoles(Guid userId)
    // {
    //     var user = await GetUserById(userId);
    //
    //     if (user is null)
    //     {
    //         return new List<UserIdentityRole>();
    //     }
    //
    //     return user.UserIdentityRoles.ToList();
    // }
    //
    // public async void Create(UserIdentity user)
    // {
    // }
    
    private bool _disposed;
    protected virtual void Dispose(bool disposing)
    {
        if (_disposed == false)
        {
            if (disposing)
            {
                _dataContext.Dispose();
            }

            _disposed = true;
        }
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    public IEnumerable<UserIdentity> GetUserIdentities()
    {
        throw new NotImplementedException();
    }

    public IQueryable<UserIdentity> GetUserIdentityById(Guid userIdentityId)
    {
        return FindByCondition(user => user.UserIdentityId == userIdentityId);
    }

    public IQueryable<UserIdentity> GetUserIdentityById(long id)
    {
        return FindByCondition(user => user.Id == id);
    }
    
    public IQueryable<UserIdentity> GetUserIdentityByEmail(string email)
    {
        return FindByCondition(user => user.Email == email);
    }

    public void InsertUserIdentity(UserIdentity userIdentity)
    {
        Create(userIdentity);
        _dataContext.SaveChanges();
    }

    public void DeleteUserIdentity(long id)
    {
        throw new NotImplementedException();
    }

    public void DeleteUserIdentity(Guid userIdentityId)
    {
        throw new NotImplementedException();
    }

    public void UpdateUserIdentity(UserIdentity userIdentity)
    {
        throw new NotImplementedException();
    }
}