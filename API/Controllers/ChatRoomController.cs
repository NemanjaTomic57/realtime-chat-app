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

public class ChatRoomController(UserManager<AppUser> userManager, ChatContext context) : BaseApiController
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult> CreateChatRoom(ContactDto dto)
    {
        var user1 = await userManager.GetUserByName(User);
        var user2 = await userManager.FindByNameAsync(dto.Username);

        if (user1 == null || user2 == null) throw new InternalServerErrorException();

        var usernames = new[] { user1.UserName, user2.UserName };

        var existingChatRoom = await context.Set<ChatRoom>()
            .FirstOrDefaultAsync(c => c.AppUsers.All(a => usernames.Contains(a.UserName)));

        if (existingChatRoom != null)
            throw new ConflictException("Chat room already exists");

        var chatRoom = new ChatRoom
        {
            AppUsers = [user1, user2]
        };

        context.Set<ChatRoom>().Add(chatRoom);

        user1.ChatRooms.Add(chatRoom);
        user2.ChatRooms.Add(chatRoom);

        await context.SaveChangesAsync();

        return Ok();
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ChatRoom>>> GetChatRoomsWithMessages()
    {
        var currentUser = await userManager.GetUserByName(User);

        var chatRooms = await context.Set<ChatRoom>()
            .Where(c => c.AppUsers.Any(u => u.Id == currentUser.Id))
            .Include(c => c.AppUsers)
            .Include(c => c.Messages)
            .ToListAsync();

        if (chatRooms.Count == 0)
            return NoContent();

        var dtos = chatRooms.Select(room =>
        {
            var participant = room.AppUsers.FirstOrDefault(u => u.Id != currentUser.Id)
                ?? throw new NotFoundException("Chat room has no other participants");

            var messageDtos = room.Messages
                .OrderBy(m => m.TimeStamp)
                .Select(message => new MessageDto
                {
                    ChatRoomId = room.Id,
                    UserName = message.AppUser.UserName!,
                    Text = message.Text,
                    TimeStamp = message.TimeStamp.ToString(),
                }).ToList();

            return new ChatRoomDto
            {
                Id = room.Id,
                UserName = participant.UserName!,
                LastSeen = participant.LastSeen,
                Messages = messageDtos,
            };
        }).ToList();

        return Ok(dtos);
    }
}
