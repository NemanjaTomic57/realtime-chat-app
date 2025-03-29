using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(ChatContext context) : BaseApiController
{
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (!HttpContext.Request.Cookies.TryGetValue("Username", out var username))
        {
            return NoContent();
        }

        foreach (var cookie in HttpContext.Request.Cookies)
        {
            Console.WriteLine($"Key: {cookie.Key}, Value: {cookie.Value}");
        }


        var user = await context.Set<AppUser>().Where(u => u.Username == username).FirstOrDefaultAsync()
            ?? throw new NotFoundException("User not found");

        return Ok(new
        {
            user.Username,
            user.Email,
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginDto dto)
    {
        var user = await context.Set<AppUser>().
            Where(u => u.Username == dto.User || u.Email == dto.User).FirstOrDefaultAsync();

        if (user == null || user.Password != dto.Password)
        {
            return Unauthorized("Wrong username or password");
        }

        HttpContext.Response.Cookies.Append("Username", user.Username, new CookieOptions
        {
            Expires = DateTimeOffset.UtcNow.AddMinutes(30),
            HttpOnly = true,
            IsEssential = true,
        });

        return Ok();
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto dto)
    {
        var existingUsername = await context.Set<AppUser>().Where(u => u.Username == dto.Username).FirstOrDefaultAsync();

        var existingEmail = await context.Set<AppUser>().Where(u => u.Email == dto.Email).FirstOrDefaultAsync();

        if (existingUsername != null)
        {
            throw new ConflictException("Username");
        }

        if (existingEmail != null)
        {
            throw new ConflictException("Email");
        }

        var user = new AppUser
        {
            Username = dto.Username,
            Email = dto.Email,
            Password = dto.Password,
        };

        context.Set<AppUser>().Add(user);

        await context.SaveChangesAsync();

        return Ok();
    }
}
