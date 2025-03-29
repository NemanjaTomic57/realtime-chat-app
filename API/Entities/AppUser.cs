using System;
using API.DTOs;

namespace API.Entities;

public class AppUser : BaseEntity
{
    public required string Username { get; set; }
    public string? Email { get; set; }
    public required string Password { get; set; }
}
