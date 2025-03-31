using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class MessageDto
{
    [Required]
    public int ChatRoomId { get; set; }

    public string UserName { get; set; } = string.Empty;

    [Required]
    public string Text { get; set; } = string.Empty;

    public string TimeStamp { get; set; } = string.Empty;
}
