"use client";

import Button from "@/shared/ui/button";
import { useState } from "react";
import ContainerSmCenter from "@/shared/ui/containerMdCenter";
import Heading from "@/shared/ui/heading";
import Icon from "@/shared/ui/icon";
import Overlay from "@/shared/ui/overlay";
import Contact from "@/shared/ui/contact";
import { dateTime } from "@/shared/libs/dateTimeConverter";
import Type from "@/shared/ui/type";
import { createChatRoom, fetchNewChatRooms } from "@/services/chatRoomService";
import { useChatRoomContext } from "@/shared/context/useChatRoomContext";

interface Props {
  contacts: Contact[] | null;
  className: string;
}

export default function ContactBook({ contacts, className }: Props) {
  const [show, setShow] = useState(false);
  const { setChatRooms } = useChatRoomContext();

  const handleClick = async (contact: Contact) => {
    if (await createChatRoom(contact)) {
      setShow(false);
      setChatRooms(await fetchNewChatRooms());
    }
  }

  return (
    <>
      <Button onClick={() => setShow(true)} className={className}>
        Contact Book
      </Button>

      {show && (
        <>
          <Overlay />
          <ContainerSmCenter>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Heading type="h2">Contact Book</Heading>
                <button
                  onClick={() => setShow(false)}
                  className="p-2 cursor-pointer hover:bg-primary-light rounded-full"
                >
                  <Icon name="close" size="lg" />
                </button>
              </div>

              {contacts?.map((contact, index) => (
                <Contact
                  key={index}
                  userName={contact.username}
                  onClick={() => handleClick(contact)}
                  className="p-2 cursor-pointer hover:bg-primary-light rounded-lg text-left"
                >
                  <Type type="sm">last seen on {dateTime(contact.lastSeen)}</Type>
                </Contact>
              ))}
            </div>
          </ContainerSmCenter>
        </>
      )}
    </>
  );
}
