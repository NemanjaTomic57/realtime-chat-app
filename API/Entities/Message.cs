using System;

namespace API.Entities;

public class Message
{
    public int Id { get; set; }
    public required string AppUserId { get; set; }
    public required AppUser AppUser { get; set; }
    public int ChatRoomId { get; set; }
    public required ChatRoom ChatRoom { get; set; }
    public required string Text { get; set; }
    public DateTimeOffset TimeStamp { get; set; } = DateTimeOffset.UtcNow;
}
