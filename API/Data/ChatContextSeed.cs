using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

public class ChatContextSeed
{
    public static async Task SeedAsync(UserManager<AppUser> userManager)
    {
        if (!userManager.Users.Any(x => x.UserName == "sysadmin"))
        {
            var user = new AppUser
            {
                UserName = "sysadmin",
                Email = "nemanja.tomic@ik.me",
            };

            await userManager.CreateAsync(user, "password");
        }

        if (!userManager.Users.Any(x => x.UserName == "Nemanja57"))
        {
            var user = new AppUser
            {
                UserName = "Nemanja57",
                Email = "nemanja.tomic@ik.me",
            };

            await userManager.CreateAsync(user, "password");
        }

        if (!userManager.Users.Any(x => x.UserName == "Testuser01"))
        {
            var user = new AppUser
            {
                UserName = "Testuser01",
                Email = "nemanja.tomic@ik.me",
            };

            await userManager.CreateAsync(user, "password");
        }
    }
}
