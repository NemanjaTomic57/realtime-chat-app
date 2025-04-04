using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var Cors = "_cors";

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddDbContext<ChatContext>(options =>
{
    options.UseSqlite("Data Source=app.db");
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: Cors,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        }
    );
});

builder.Services.AddIdentityApiEndpoints<AppUser>().AddEntityFrameworkStores<ChatContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
});

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
{
    options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddScoped<EmailService>();
builder.Services.AddScoped<FileService>();
builder.Services.AddTransient<IUserValidator<AppUser>, OptionalEmailUserValidator<AppUser>>();
builder.Services.AddSignalR();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseMiddleware<ExceptionHandler>();

app.UseCors(Cors);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/hub/chat");

try
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ChatContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await ChatContextSeed.SeedAsync(userManager);
}
catch (Exception ex)
{
    Console.WriteLine("Error when seeding data: " + ex);
    throw;
}

app.Run();
