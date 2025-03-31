import Messenger from "@/components/messenger";
import ContactBook from "@/components/contactBook";
import LogoutButton from "@/components/logoutButton";
import { routes } from "@/routes";
import { getUserInfo } from "@/services/accountService";
import { getAllContacts } from "@/services/contactsService";
import { getAllCookies } from "@/services/cookieService";
import Button from "@/shared/ui/button";
import Contact from "@/shared/ui/contact";
import Heading from "@/shared/ui/heading";
import { redirect } from "next/navigation";
import ChatRooms from "@/components/chatRooms";
import { getChatRooms } from "@/services/chatRoomService";
import ChatRoomProvider from "@/shared/context/chatRoomsProvider";

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
            <Button className="btn__chat-header">Settings</Button>
            <LogoutButton />
          </div>
        </div>

        {/* Panel */}
        <div className="h-full grid grid-cols-[300px_1fr] bg-tone border-border border-1 rounded-lg overflow-hidden">
          {/* Sidebar */}
          <div className="flex flex-col border-r-1 border-border overflow-scroll bg-primary">
            <Contact userName={user.userName} className="p-3 bg-primary border-b-1 border-border" />

            <ChatRooms userName={user.userName}>
              <ContactBook contacts={contacts} className="btn__chat-header" />
            </ChatRooms>
          </div>

          {/* Messenger */}
          <Messenger currentUser={user} />
        </div>
      </div>
    </ChatRoomProvider>
  );
}
