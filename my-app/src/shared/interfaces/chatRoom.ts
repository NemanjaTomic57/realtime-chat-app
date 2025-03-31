interface ChatRoom {
    id: number,
    userName: string,
    lastSeen: Date,
    profilePictureUrl: string,
    messages: Message[],
}

interface Message {
    chatRoomId: number,
    userName?: string,
    text: string,
    timeStamp?: Date,
}