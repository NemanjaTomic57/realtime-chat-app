"use client";

import { routes } from "@/routes";
import { logout } from "@/services/account";
import Button from "@/shared/ui/button";
import Heading from "@/shared/ui/heading";
import Icon from "@/shared/ui/icon";
import Type from "@/shared/ui/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import ChatSidebar from "./chatSidebar";
import ChatRoom from "./chatRoom";

interface Props {
  userPromise: Promise<User | null>;
  chatsPromise: Promise<ChatRoom[] | null>;
}

export default function ChatPanel({ userPromise, chatsPromise }: Props) {
  const user = use(userPromise);
  const chats = use(chatsPromise);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(routes.login);
    }
  }, []);

  return (
    <>
      <div className="flex justify-between mb-4 align-middle">
        <Heading type="h1">Chats</Heading>
        <Button onClick={logout} className="btn-fill btn-md h-fit">
          Logout
        </Button>
      </div>
      
      <div className="h-full grid grid-cols-[300px_1fr] bg-tone border-border border-1 rounded-lg overflow-hidden">
        <ChatSidebar />
        <ChatRoom />        
      </div>
    </>
  );
}
