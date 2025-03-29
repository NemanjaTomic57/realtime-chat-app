using System.Security.Claims;
using API.Entities;
using API.Exceptions;
using Microsoft.AspNetCore.Identity;

namespace API.Extensions;

public static class ClaimsPrincipleExtensions
{
    public static async Task<AppUser> GetUserByName(this UserManager<AppUser> userManager,
        ClaimsPrincipal User)
    {
        var name = User.FindFirstValue(ClaimTypes.Name) ?? throw new NotFoundException("Name Claim not found");

        var userToReturn = await userManager.FindByNameAsync(name) ?? throw new NotFoundException("User not found");

        return userToReturn;
    }
}
