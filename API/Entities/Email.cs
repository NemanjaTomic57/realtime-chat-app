using System;

namespace API.Entities;

public class Email
{
    public required string ToEmail { get; set; }
    public required string Subject { get; set; }
    public required string HtmlBody { get; set; }
}
