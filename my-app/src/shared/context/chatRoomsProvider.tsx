"use client"

import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

interface ChatRoomContextType {
    chatRooms: ChatRoom[] | null;
    setChatRooms: Dispatch<SetStateAction<ChatRoom[] | null>>;
    currentChatRoom: ChatRoom | null;
    setCurrentChatRoom: Dispatch<SetStateAction<ChatRoom | null>>;
}

export const ChatRoomContext = createContext<ChatRoomContextType | null>(null);

interface Props {
    existingChatRooms: ChatRoom[] | null;
    children: React.ReactNode;
}

export default function ChatRoomProvider({existingChatRooms, children}: Props) {
    const [chatRooms, setChatRooms] = useState<ChatRoom[] | null>(existingChatRooms);
    const [currentChatRoom, setCurrentChatRoom] = useState<ChatRoom | null>(chatRooms && chatRooms[0]);

    return (
        <ChatRoomContext.Provider value={{chatRooms, setChatRooms, currentChatRoom, setCurrentChatRoom}}>
            {children}
        </ChatRoomContext.Provider>
    )
}
