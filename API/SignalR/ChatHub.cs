using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Exceptions;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

[Authorize]
public class ChatHub(ChatContext context, UserManager<AppUser> userManager, EmailService emailService) : Hub
{
    public async Task JoinChatRooms()
    {
        var user = await userManager.GetUserByName(Context.User!);

        var chatRooms = await context.Set<ChatRoom>()
            .Where(c => c.AppUsers.Any(a => a.Id == user.Id))
            .ToListAsync();

        foreach (var room in chatRooms)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, room.Id.ToString());
        }
    }

    public async Task JoinSpecificChatRooms()
    {
        var user = await userManager.GetUserByName(Context.User!);

        var chatRooms = await context.Set<ChatRoom>()
            .Where(c => c.AppUsers.Any(a => a.Id == user.Id))
            .ToListAsync();

        foreach (var room in chatRooms)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, room.Id.ToString());
        }
    }

    public async Task NewMessage(MessageDto dto)
    {
        var user = await userManager.GetUserByName(Context.User!);

        var chatRoom = await context.Set<ChatRoom>().Include(c => c.AppUsers).FirstOrDefaultAsync(c => c.Id == dto.ChatRoomId)
            ?? throw new NotFoundException("Chat room not found");

        dto.UserName = user.UserName!;
        dto.TimeStamp = DateTimeOffset.UtcNow.ToString();

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

        await Clients.Group(dto.ChatRoomId.ToString()).SendAsync("ReceiveMessage", dto);

        var receiverEmails = chatRoom.AppUsers
            .Select(a => a.Email)
            .Where(email => email != user.Email)
            .ToList();

        await Task.WhenAll(receiverEmails.Select(email => emailService.NewNotification(email!)));
    }
}
