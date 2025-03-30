using System;

namespace API.Entities;

public class Message
{
    public int Id { get; set; }
    public int ChatRoomId { get; set; }
    public required ChatRoom ChatRoom { get; set; }
}
