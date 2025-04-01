using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUser : IdentityUser
{
    public DateTimeOffset LastSeen { get; set; } = DateTimeOffset.UtcNow;
    public string? ProfilePictureUrl { get; set; }
    public ICollection<ChatRoom> ChatRooms { get; set; } = [];
    public ICollection<Message> Messages { get; set; } = [];
}
