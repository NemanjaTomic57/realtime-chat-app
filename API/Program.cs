using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// app.UseHttpsRedirection();

app.UseMiddleware<ExceptionHandler>();

app.UseCors(Cors);

app.UseAuthorization();

app.MapControllers();

app.Run();
