using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ChatContext(DbContextOptions<ChatContext> options) : IdentityDbContext<AppUser>(options)
{
    public required DbSet<ChatRoom> ChatRooms { get; set; }
    public required DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<AppUser>()
            .HasMany(e => e.ChatRooms)
            .WithMany(e => e.Participants);

        builder.Entity<ChatRoom>()
            .HasMany(e => e.Messages)
            .WithOne(e => e.ChatRoom)
            .HasForeignKey(e => e.ChatRoomId)
            .IsRequired();
    }
}
