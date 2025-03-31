"use client";

import { sendMessage } from "@/services/messageService";
import { useChatRoomContext } from "@/shared/context/useChatRoomContext";
import { dateOnly, dateTime, timeOnly } from "@/shared/libs/dateTimeConverter";
import Icon from "@/shared/ui/icon";
import Type from "@/shared/ui/type";
import clsx from "clsx";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Props {
  currentUser: User;
}

export default function Messenger({ currentUser }: Props) {
  const { currentChatRoom } = useChatRoomContext();
  const [message, setMessage] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChatRoom?.messages]);

  const isSender = (userName: string) => {
    return userName == currentUser.userName;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentChatRoom == null || !message.trim()) return false;

    const newMessage: Message = {
      chatRoomId: currentChatRoom.id,
      text: message,
    };

    sendMessage(newMessage);
    setMessage("");
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] overflow-hidden">
      <div className="flex w-full p-4 items-center gap-4 bg-primary border-b-1 border-border">
        <Image src="/ProfilePicture_1.jpg" height={60} width={60} alt="Profile Picture" className="rounded-full" />
        <div className="grid">
          <Type type="lgBold" className="flex-grow">
            Nemanja57
          </Type>
          <Type type="lgGrey">last seen 15.03.2025</Type>
        </div>
      </div>

      <div className="bg-primary-tint overflow-scroll p-4">
        <div className="grid gap-1.5">
          {currentChatRoom?.messages.map((message, index) => {
            const lastDate = dateOnly(currentChatRoom.messages[index - 1]?.timeStamp || "");
            return (
              <div key={index} className="grid gap-1.5">
                {lastDate != dateOnly(message.timeStamp!) && (
                  <p className="bg-primary border-1 border-border py-1 px-4 rounded-lg m-auto">
                    {dateOnly(message.timeStamp!)}
                  </p>
                )}

                <div
                  className={clsx(
                    "bg-primary-light py-1 px-4 rounded-lg w-[500px]",
                    isSender(message.userName!) && "text-right ml-auto"
                  )}
                >
                  <p>{message.text}</p>
                  <Type type="xsGrey">{timeOnly(message.timeStamp!)}</Type>
                </div>
              </div>
            );
          })}

          {currentChatRoom?.messages.length === 0 && (
            <p className="bg-primary border-1 border-border py-1 px-4 rounded-lg m-auto">No messages yet</p>
          )}
        </div>
        <div ref={bottomRef} />
      </div>

      <div className="h-[69px] px-4 w-full bg-primary flex items-center gap-4 border-t-1 border-border">
        <div className="p-2 rounded-full hover:bg-primary-shade cursor-pointer">
          <Icon name="plus" size="lg" />
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="w-full bg-primary-shade input py-2!"
          />
        </form>
      </div>
    </div>
  );
}
