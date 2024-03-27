using Marketplace.Domain.Repositories;
using Marketplace.Infrastructure.Cerbos;
using Marketplace.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Marketplace.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddMarketplaceInfrastructure(this IServiceCollection services)
    {
        services.AddSingleton<ICerbosProvider, CerbosProvider>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();

        return services;
    }
    
}