import ChatPanel from "@/components/chatPanel";
import { getUserInfo, logout } from "@/services/account";
import { getApiCookie } from "@/services/getCookies";

export default async function Home() {
  const cookie = await getApiCookie();
  const user = getUserInfo(cookie);

  return (
    <div className="max-w-[1400px] m-auto">
      <ChatPanel userPromise={user} />
    </div>
  );
}
