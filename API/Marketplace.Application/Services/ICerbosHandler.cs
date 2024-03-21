using Marketplace.Application.DTOs;

public interface ICerbosHandler
{
    public Task<bool> Handle(AuthorizationDto data); 
}