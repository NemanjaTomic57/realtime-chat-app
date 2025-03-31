import { apiUrl } from "@/environment"
import toast from "react-hot-toast";

export const sendMessage = async (message: Message) => {
    const res = await fetch(apiUrl + "message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(message)
    });

    if (res.status != 200) {
        toast.error("Error when sending message. Please try again.")
    }
}