using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Exceptions;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class MessageController(ChatContext context, UserManager<AppUser> userManager) : BaseApiController
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult> CreateNewMessage(MessageDto dto)
    {
        var user = await userManager.GetUserByName(User);

        var chatRoom = await context.Set<ChatRoom>().FirstOrDefaultAsync(c => c.Id == dto.ChatRoomId)
            ?? throw new NotFoundException("Chat room not found");

        var message = new Message
        {
            AppUserId = user.Id,
            AppUser = user,
            ChatRoomId = chatRoom.Id,
            ChatRoom = chatRoom,
            Text = dto.Text,
        };

        context.Set<Message>().Add(message);

        await context.SaveChangesAsync();

        return Ok();
    }
}
