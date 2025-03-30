using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class ChatRoomDto
{
    [Required]
    public string Username { get; set; } = string.Empty;
    
    public string? ProfilePictureUrl { get; set; }

    [Required]
    public DateTime LastSeen { get; set; }

    public ICollection<MessageDto>? Messages { get; set; }
}

public class MessageDto
{
    [Required]
    public string Sender { get; set; } = string.Empty;

    [Required]
    public string Message { get; set; } = string.Empty;

    [Required]
    public DateTime TimeStamp { get; set; }
}
