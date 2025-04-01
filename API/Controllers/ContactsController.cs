using System;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ContactsController(UserManager<AppUser> userManager) : BaseApiController
{
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ContactDto>>> GetAllContacts()
    {
        var user = await userManager.GetUserByName(User);

        var contacts = await userManager.Users.Where(u => u.UserName != user.UserName).ToListAsync();

        if (contacts == null) return NoContent();

        var contactsToReturn = new List<ContactDto>();

        contactsToReturn.AddRange(contacts.Select(contact => new ContactDto
        {
            Username = contact.UserName!,
            LastSeen = contact.LastSeen,
            ProfilePictureUrl = contact.ProfilePictureUrl,
        }));

        return Ok(contactsToReturn);
    }
}
