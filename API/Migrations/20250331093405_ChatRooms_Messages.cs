using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ChatRooms_Messages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUserChatRoom_AspNetUsers_ParticipantsId",
                table: "AppUserChatRoom");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppUserChatRoom",
                table: "AppUserChatRoom");

            migrationBuilder.DropIndex(
                name: "IX_AppUserChatRoom_ParticipantsId",
                table: "AppUserChatRoom");

            migrationBuilder.RenameColumn(
                name: "ParticipantsId",
                table: "AppUserChatRoom",
                newName: "AppUsersId");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Messages",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "Messages",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Timestamp",
                table: "Messages",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppUserChatRoom",
                table: "AppUserChatRoom",
                columns: new[] { "AppUsersId", "ChatRoomsId" });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_AppUserId",
                table: "Messages",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AppUserChatRoom_ChatRoomsId",
                table: "AppUserChatRoom",
                column: "ChatRoomsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserChatRoom_AspNetUsers_AppUsersId",
                table: "AppUserChatRoom",
                column: "AppUsersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_AspNetUsers_AppUserId",
                table: "Messages",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUserChatRoom_AspNetUsers_AppUsersId",
                table: "AppUserChatRoom");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_AspNetUsers_AppUserId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_AppUserId",
                table: "Messages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppUserChatRoom",
                table: "AppUserChatRoom");

            migrationBuilder.DropIndex(
                name: "IX_AppUserChatRoom_ChatRoomsId",
                table: "AppUserChatRoom");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Text",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "AppUsersId",
                table: "AppUserChatRoom",
                newName: "ParticipantsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppUserChatRoom",
                table: "AppUserChatRoom",
                columns: new[] { "ChatRoomsId", "ParticipantsId" });

            migrationBuilder.CreateIndex(
                name: "IX_AppUserChatRoom_ParticipantsId",
                table: "AppUserChatRoom",
                column: "ParticipantsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserChatRoom_AspNetUsers_ParticipantsId",
                table: "AppUserChatRoom",
                column: "ParticipantsId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
