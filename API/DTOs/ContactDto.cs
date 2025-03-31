using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class ContactDto
{
    [Required]
    public string Username { get; set; } = string.Empty;

    public DateTimeOffset? LastSeen { get; set; }

    public string? ProfilePictureUrl { get; set; }
}
