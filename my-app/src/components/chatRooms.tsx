"use client";

import Contact from "@/shared/ui/contact";
import Type from "@/shared/ui/type";
import { useChatRoomContext } from "@/shared/context/useChatRoomContext";
import clsx from "clsx";
import Icon from "@/shared/ui/icon";

interface Props {
  userName: string;
  children: React.ReactNode;
}

export default function ChatRooms({ userName, children }: Props) {
  const { chatRooms, currentChatRoom, setCurrentChatRoom } = useChatRoomContext();

  const lastMessage = (messages: Message[]) => {
    return messages[messages.length - 1];
  };

  const isSender = (message: Message) => {
    return message.userName == userName;
  };

  return (
    <div className="flex-grow bg-primary-tint">
      {chatRooms != null ? (
        <div>
          {chatRooms.map((room, index) => {
            const last = lastMessage(room.messages);

            return (
              <Contact
                key={index}
                userName={room.userName}
                onClick={() => setCurrentChatRoom(room)}
                className={clsx(
                  "p-3 cursor-pointer",
                  room === currentChatRoom ? "bg-primary-shade" : "hover:bg-primary"
                )}
              >
                {last ? (
                  <Type type="sm" className="truncate whitespace-nowrap w-full flex items-center gap-2">
                    {isSender(last) && <Icon name="doubleCheck" />}
                    {last.text}
                  </Type>
                ) : (
                  <Type type="smGrey" className="truncate whitespace-nowrap w-full block">
                    Be the first to write a message!
                  </Type>
                )}
              </Contact>
            );
          })}
        </div>
      ) : (
        <div className="flex-grow text-center">
          <Type type="lgBold" className="my-4">
            Start Chatting Now!
          </Type>
          {children}
        </div>
      )}
    </div>
  );
}
