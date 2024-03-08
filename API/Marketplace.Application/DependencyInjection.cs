using Marketplace.Application.Services;
using Marketplace.Infrastructure.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Marketplace.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddMarketPlaceApplication(this IServiceCollection services)
    {
        services.AddScoped<IPaginationService, PaginationService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ICerbosHandler, CerbosHandler>();

        return services;
    }
}
