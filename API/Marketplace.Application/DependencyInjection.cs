using Marketplace.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Marketplace.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddMarketPlaceApplication(this IServiceCollection services)
    {
        services.AddScoped<IPaginationService, PaginationService>();
        services.AddScoped<IUserService, UserService>();

        return services;
    }
}
