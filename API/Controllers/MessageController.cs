using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Exceptions;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class MessageController
    (ChatContext context, UserManager<AppUser> userManager, EmailService emailService) 
    : BaseApiController
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult> CreateNewMessage(MessageDto dto)
    {
        var user = await userManager.GetUserByName(User);

        var chatRoom = await context.Set<ChatRoom>().Include(c => c.AppUsers).FirstOrDefaultAsync(c => c.Id == dto.ChatRoomId)
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

        var receiverEmails = chatRoom.AppUsers
            .Select(a => a.Email)
            .Where(email => email != user.Email)
            .ToList();

        await Task.WhenAll(receiverEmails.Select(email => emailService.NewNotification(email!)));

        return Ok();
    }
}
