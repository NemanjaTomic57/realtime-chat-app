using System;
using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs;

public class ChatRoomDto
{
    public int Id { get; set; }

    [Required]
    public string UserName { get; set; } = string.Empty;
    
    public string? ProfilePictureUrl { get; set; }

    [Required]
    public DateTimeOffset LastSeen { get; set; }

    public ICollection<MessageDto> Messages { get; set; } = [];
}