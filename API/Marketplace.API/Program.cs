// Core
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text;

// Service
using Marketplace.Services.AuthService;
using Marketplace.Services.CategoryService;
using Marketplace.Services.Pagination;
using Marketplace.Services.ProductService;
using Marketplace.Services.NotificationService;

// APM
using Elastic.Apm.NetCoreAll;

// Hangfire
using Hangfire;
using Hangfire.SqlServer;
using Marketplace.Application;
using Marketplace.Domain.Entities;
using Marketplace.Extensions;
using Marketplace.Infrastructure;
using Marketplace.Infrastructure.ConfigurationOptions;
using Marketplace.Services;
using Marketplace.Infrastructure.Data;
using Marketplace.Services.AuthServiceService;

// logging
using Serilog;

var developmentOrigins = "_allowedOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, configuration) =>
{
    configuration.ReadFrom.Configuration(context.Configuration);
});

var hangfireStorageOptions = new SqlServerStorageOptions()
{
    TryAutoDetectSchemaDependentOptions = true,
    PrepareSchemaIfNecessary = true
};

builder.Services.AddHangfire(options => options.SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseSqlServerStorage(builder.Configuration.GetConnectionString("HangfireConnection"), hangfireStorageOptions));

builder.Services.AddSwaggerGen(opt =>
{
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        In = ParameterLocation.Header,
        Description = "Authorization Token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
    
    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: developmentOrigins, policy =>
    {
        policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddRouting(opts => opts.LowercaseUrls = true);

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlServerOptionsAction =>
        {
            sqlServerOptionsAction.MigrationsAssembly("Marketplace.Infrastructure");
            sqlServerOptionsAction.EnableRetryOnFailure(10, TimeSpan.FromSeconds(5), null);
        }));
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]!)),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true
    };
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddHangfireServer();
builder.Services.AddAuthorization();

builder.Services.AddScoped<IPaginationService, PaginationService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductStatusService, ProductStatusService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IRefreshTokenCleanupService, RefreshTokenCleanupService>();
builder.Services.AddScoped<IRequestLogService, RequestLogService>();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddMarketPlaceApplication();
builder.Services.AddMarketplaceInfrastructure();

// IOptions
builder.Services.Configure<CerbosOptions>(
    builder.Configuration.GetSection(CerbosOptions.Name));

var app = builder.Build();

app.UseForwardedHeaders();

if (app.Environment.IsProduction())
{
    app.UseAllElasticApm(builder.Configuration);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(developmentOrigins);
}
else
{
    app.ConfigureExceptionHandler();
}

app.UseSerilogRequestLogging();

// app.UseMarketplaceRequestResponseLogger();


app.UseHttpsRedirection();

// app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

using (var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
{
    var logger = serviceScope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    var ctx = serviceScope.ServiceProvider.GetRequiredService<DataContext>();
    var db = ctx.Database;

    logger.LogInformation("Migrating database...");

    while (!db.CanConnect())
    {
        logger.LogInformation("Database not ready yet; waiting...");
        Thread.Sleep(1000);
        ctx = serviceScope.ServiceProvider.GetRequiredService<DataContext>();
        db = ctx.Database;
    }

    try
    {
        serviceScope.ServiceProvider.GetRequiredService<DataContext>().Database.Migrate();
        logger.LogInformation("Database migrated successfully.");
        
        db.EnsureCreated();

        var role = ctx.Roles.FirstOrDefault(b => b.Name == "USER");
        if (role == null)
        {
            ctx.Roles.Add(new Role() { Name = "USER", Description = "Default Role for all Users" });
            logger.LogInformation("Default Role Seeded!");
        }

        ctx.SaveChanges();
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while migrating the database.");
    }
}

app.UseHangfireDashboard();

RecurringJob.AddOrUpdate<NotificationService>(service => service.Job(), "0/2 * * * *");
RecurringJob.AddOrUpdate<RefreshTokenCleanupService>(service => service.Execute(), "0/1 * * * *");

app.Run();
