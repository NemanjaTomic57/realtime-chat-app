using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ChatContext(DbContextOptions<ChatContext> options) : DbContext(options)
{
    public required DbSet<AppUser> AppUsers { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}
