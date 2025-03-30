import ChatPanel from "@/components/chatPanel";
import { getAllChats, getUserInfo } from "@/services/account";
import { getApiCookie } from "@/services/getCookies";

export default async function Home() {
  const cookie = await getApiCookie();
  const user = getUserInfo(cookie);
  const chats = getAllChats(cookie);

  return (
    <div className="container h-dvh flex flex-col">
      <ChatPanel userPromise={user} chatsPromise={chats} />
    </div>
  );
}
