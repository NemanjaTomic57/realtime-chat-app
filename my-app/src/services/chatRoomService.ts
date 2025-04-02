import { apiUrl } from "@/environment"
import { generalErrorToast } from "@/shared/libs/toasts";
import toast from "react-hot-toast";

export const createChatRoom = async (contact: Contact) => {
    const res = await fetch(apiUrl + "chatroom", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(contact),
    });

    if (res.status == 200) {
        toast.success("Great, feel free to write a message.");
        return true;
    } else if (res.status == 409) {
        toast.error("A chat room with this contact already exists.");
        return false;
    } else {
        generalErrorToast();
        return false;
    }
}

export const getChatRooms = async (cookie: string) => {
    const res = await fetch(apiUrl + "chatroom", {
        method: "GET",
        headers: {
            cookie: cookie
        },
        cache: "no-cache",
    });

    if (res.status == 200) {
        const chatRooms = await res.json();
        return chatRooms as ChatRoom[] | null;
    } else if (res.status == 204) {
        return null;
    } else {
        return null;
    }
}

export const fetchNewChatRooms = async () => {
    const res = await fetch(apiUrl + "chatroom", {
        method: "GET",
        credentials: "include",
    });

    if (res.status == 200 || res.status == 204) {
        const chatRooms = await res.json();
        return chatRooms as ChatRoom[] | null;
    } else {
        toast.error("Error when fetching the chat rooms");
        return null;
    }
}
