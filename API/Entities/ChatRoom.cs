using System;

namespace API.Entities;

public class ChatRoom
{
    public int Id { get; set; }
    public required ICollection<AppUser> AppUsers { get; set; }
    public ICollection<Message> Messages { get; set; } = [];
}
