using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    public string Username { get; set; } = string.Empty;

    public string? Email { get; set; }

    [Required]
    public string Password { get; set; } = string.Empty;
}
