import Image from "next/image";
import Type from "./type";
import clsx from "clsx";

interface Props {
  userName: string;
  profilePictureUrl: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function Contact({ userName, profilePictureUrl, onClick, className, children }: Props) {
  return (
    <div onClick={onClick} className={clsx(className, "flex gap-4 items-center")}>
      <div className="relative w-[50px] aspect-square m-auto rounded-full overflow-hidden">
        <Image src={profilePictureUrl || "/profilePicturePlaceholder.png"} alt="Profile Picture" fill className="object-cover" />
      </div>
      <div className="overflow-hidden w-full">
        <Type type="lgBold">{userName}</Type>
        {children}
      </div>
    </div>
  );
}
