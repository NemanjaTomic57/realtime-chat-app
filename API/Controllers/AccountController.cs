using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Exceptions;
using API.Extensions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(UserManager<AppUser> userManager) : BaseApiController
{
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false)
        {
            return NoContent();
        }

        var user = await userManager.GetUserByName(User);

        user.LastSeen = DateTime.UtcNow;

        await userManager.UpdateAsync(user);

        return Ok(new
        {
            user.UserName,
            user.Email,
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginDto dto)
    {
        var user = await userManager.FindByNameAsync(dto.User);

        if (user == null || !await userManager.CheckPasswordAsync(user, dto.Password))
        {
            throw new UnauthorizedException("You are not authorized.");
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName!),
        };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        var authProperties = new AuthenticationProperties
        {
            IssuedUtc = DateTime.UtcNow,
        };

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);

        return Ok();
    }

    [Authorize]
    [HttpGet("logout")]
    public async Task<ActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        return NoContent();
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto dto)
    {
        var user = new AppUser
        {
            UserName = dto.Username,
            Email = dto.Email,
        };

        var result = await userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded) throw new InternalServerErrorException(result.ToString());

        return Ok();
    }
}
