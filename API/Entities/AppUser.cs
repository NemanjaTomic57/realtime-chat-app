using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUser : IdentityUser
{
    public DateTime LastSeen { get; set; } = DateTime.UtcNow;
    public ICollection<ChatRoom> ChatRooms { get; set; } = [];
}
