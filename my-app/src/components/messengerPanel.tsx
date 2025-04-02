"use client";

import Contact from "@/shared/ui/contact";
import ChatRooms from "./chatRooms";
import ContactBook from "./contactBook";
import Messenger from "./messenger";
import { chatHubUrl } from "@/environment";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { useChatRoomContext } from "@/shared/context/useChatRoomContext";

interface Props {
  user: User;
  contacts: Contact[] | null;
}

export default function MessengerPanel({ user, contacts }: Props) {
  const { chatRooms, setChatRooms } = useChatRoomContext();
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [newMessage, setNewMessage] = useState<Message | null>(null);

  useEffect(() => {
    const connect = async () => {
      const newConnection = new HubConnectionBuilder().withUrl(chatHubUrl).withAutomaticReconnect().build();

      try {
        await newConnection.start();
        console.log("Connection started");

        newConnection.invoke("JoinChatRooms");
        newConnection.on("ReceiveMessage", (message: Message) => {
          setNewMessage(message);
        });

        setConnection(newConnection);
      } catch (err) {
        console.error("Connection failed: ", err);
      }
    };

    connect();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  useEffect(() => {
    connection?.invoke("JoinChatRooms");
  }, [chatRooms]);

  useEffect(() => {
    if (newMessage === null) return;

    setChatRooms((rooms) => {
      if (!rooms) return null;
      return rooms.map((room) =>
        room.id === newMessage.chatRoomId ? { ...room, messages: [...room.messages, newMessage] } : room
      );
    });
  }, [newMessage]);

  return (
    <div className="h-full grid grid-cols-[300px_1fr] bg-tone border-border border-1 rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="flex flex-col border-r-1 border-border overflow-auto bg-primary">
        <Contact
          userName={user.userName}
          profilePictureUrl={user.profilePictureUrl}
          className="p-3 bg-primary border-b-1 border-border"
        />

        <ChatRooms userName={user.userName}>
          <ContactBook contacts={contacts} className="btn__chat-header" />
        </ChatRooms>
      </div>

      <Messenger currentUser={user} connection={connection} />
    </div>
  );
}
