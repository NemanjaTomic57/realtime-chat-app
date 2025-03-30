import Heading from "@/shared/ui/heading";
import Icon from "@/shared/ui/icon";

export default function ChatSidebar() {
  return (
    <div className="flex flex-col border-r-1 border-border overflow-scroll">
      <div className="p-4 bg-primary flex items-center gap-4 border-b-1 border-border hover:bg-primary-shade cursor-pointer">
        <div className="rounded-full">
          <Icon name="contacts" size="lg" />
        </div>
        <Heading type="h3">Contacts</Heading>
      </div>

      <div className="flex-grow bg-primary p-4">No Chats yet</div>

      <div className="p-4 bg-primary flex gap-4 items-center hover:bg-primary-shade cursor-pointer border-t-1 border-border">
        <div className="rounded-full">
          <Icon name="settings" size="lg" />
        </div>
        <Heading type="h3">Settings</Heading>
      </div>
    </div>
  );
}
