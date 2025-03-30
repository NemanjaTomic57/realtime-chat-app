using System;

namespace API.Entities;

public class ChatRoom
{
    public int Id { get; set; }
    public ICollection<AppUser> Participants { get; set; } = [];
    public ICollection<Message> Messages { get; set; } = [];
}
