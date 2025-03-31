// context/useChatRoom.ts
import { useContext } from "react";
import { ChatRoomContext } from "./chatRoomsProvider";

export function useChatRoomContext() {
    const context = useContext(ChatRoomContext);
    if (!context) {
        throw new Error("useChatRoom must be used within a ChatRoomProvider");
    }
    return context;
}
