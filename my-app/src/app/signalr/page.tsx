"use client";

import { chatHubUrl } from "@/environment";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const userName = new Date().getTime();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");
  const connectionRef = useRef<any>(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder().withUrl(chatHubUrl).withAutomaticReconnect().build();

    newConnection.on("messageReceived", (userName: string, message: string) => {
      const newMessage: Message = {
        chatRoomId: 1,
        userName,
        text: message,
      };
      setMessages((prev) => [...(prev || []), newMessage]);
    });

    newConnection
      .start()
      .then(() => {
        console.log("Connection started");
      })
      .catch((err) => console.log(err));

    connectionRef.current = newConnection;

    return () => {
      newConnection.stop();
    };
  }, []);

  function send() {
    if (text.trim() && connectionRef.current) {
      connectionRef.current.send("newMessage", userName, text).then(() => {
        setText("");
      });
    }
  }
  
  return (
    <div>
      <div className="messages">
        {messages &&
          messages.map((message, index) => (
            <div key={index} className="flex gap-2">
              <div className="messageAuthor">{message.userName}</div>
              <div className="messageAuthor">{message.text}</div>
            </div>
          ))}
      </div>
      <div className="input-zone">
        <label id="lblMessage" htmlFor="tbMessage">
          Message:
        </label>
        <input
          id="tbMessage"
          className="input-zone-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button id="btnSend" className="cursor-pointer hover:bg-primary-light px-4 h-full py-2" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}
