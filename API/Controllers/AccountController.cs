using System.Security.Claims;
using System.Web;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Exceptions;
using API.Extensions;
using API.Services;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(ChatContext context, UserManager<AppUser> userManager, EmailService emailService, 
    FileService fileService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto dto)
    {
        await emailService.NewRegistration();

        var user = new AppUser
        {
            UserName = dto.Username,
            Email = dto.Email,
        };

        var result = await userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded) throw new BadRequestException(result.ToString());

        await emailService.SendChangeEmailLink(user);

        return Ok();
    }

    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false)
        {
            return NoContent();
        }

        var user = await userManager.GetUserByName(User);

        user.LastSeen = DateTimeOffset.UtcNow;

        await userManager.UpdateAsync(user);

        return Ok(new
        {
            user.UserName,
            user.Email,
            user.ProfilePictureUrl,
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

    [Authorize]
    [HttpPost("email")]
    public async Task<ActionResult> SendUpdateEmailLink(EmailDto dto)
    {
        var user = await userManager.GetUserByName(User) ?? throw new NotFoundException("User not found");

        user.Email = dto.Email;

        await emailService.SendChangeEmailLink(user);

        return Ok();
    }

    [Authorize]
    [HttpPost("email/confirm")]
    public async Task<ActionResult> UpdateEmail(EmailDto dto)
    {
        var user = await userManager.GetUserByName(User);

        var result = await userManager.ChangeEmailAsync(user, dto.Email, dto.Token!);

        if (!result.Succeeded)
            throw new InternalServerErrorException();

        return Ok();
    }

    [Authorize]
    [HttpPost("profile-picture")]
    public async Task<ActionResult> UpdateProfilePicture(IFormFile profilePicture)
    {
        if (profilePicture == null || profilePicture.Length == 0)
            throw new BadRequestException("No profile picture uploaded");

        var user = await userManager.GetUserByName(User);

        user.ProfilePictureUrl = await fileService.UploadImage(profilePicture);

        await context.SaveChangesAsync();

        return Ok();
    }
}
