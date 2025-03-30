interface ChatRoom {
    username: string,
    profilePictureUrl: string,
    lastSeen: string,
    messages: Message[],
}

interface Message {
    sender: string,
    message: string,
    timeStamp: string,
}