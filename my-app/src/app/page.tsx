import ContactBook from "@/components/contactBook";
import LogoutButton from "@/components/logoutButton";
import MessengerPanel from "@/components/messengerPanel";
import Settings from "@/components/settings";
import { routes } from "@/routes";
import { getUserInfo } from "@/services/accountService";
import { getChatRooms } from "@/services/chatRoomService";
import { getAllContacts } from "@/services/contactsService";
import { getAllCookies } from "@/services/cookieService";
import ChatRoomProvider from "@/shared/context/chatRoomsProvider";
import Heading from "@/shared/ui/heading";
import { redirect } from "next/navigation";


export default async function Home() {
  const cookie = await getAllCookies();
  const user = await getUserInfo(cookie);
  const contacts = await getAllContacts(cookie);
  const chatRooms = await getChatRooms(cookie);

  if (user == null) {
    redirect(routes.login);
  }

  return (
    <ChatRoomProvider existingChatRooms={chatRooms}>
      <div className="container h-dvh flex flex-col">
        <div className="flex mb-4 align-middle">
          <Heading type="h1">Chat Rooms</Heading>

          <div className="grid grid-cols-3 ml-auto items-center gap-4">
            <ContactBook contacts={contacts} className="btn__chat-header" />
            <Settings user={user} className="btn__chat-header" />
            <LogoutButton />
          </div>
        </div>

        {/* Panel */}
        <MessengerPanel user={user} contacts={contacts} />
      </div>
    </ChatRoomProvider>
  );
}
