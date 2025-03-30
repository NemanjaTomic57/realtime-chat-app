import Icon from "@/shared/ui/icon";
import Type from "@/shared/ui/type";
import Image from "next/image";

export default function ChatRoom() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <div className="flex w-full p-4 items-center gap-4 bg-primary border-b-1 border-border">
        <Image src="/ProfilePicture_1.jpg" height={60} width={60} alt="Profile Picture" className="rounded-full" />
        <div className="grid">
          <Type type="lgBold" className="flex-grow">
            Nemanja57
          </Type>
          <Type type="lgGrey">last seen 15.03.2025</Type>
        </div>
      </div>

      <div className="flex-grow bg-primary-tint">Message area</div>

      <div className="h-[69px] px-4 w-full bg-primary flex items-center gap-4 border-t-1 border-border">
        <div className="p-2 rounded-full hover:bg-primary-shade cursor-pointer">
          <Icon name="plus" size="lg" />
        </div>
        <input placeholder="Type a message" className="w-full bg-primary-shade border-1 border-border p-2 rounded-lg" />
      </div>
    </div>
  );
}
