import Image from "next/image";
import Type from "./type";
import clsx from "clsx";

interface Props {
    userName: string,
    onClick?: () => void,
    className?: string,
    children?: React.ReactNode,
}

export default function Contact({ userName, onClick, className, children }: Props) {
  return (
    <div onClick={onClick} className={clsx(className, "flex gap-4 items-center")}>
      <Image
        src="/profilePicturePlaceholder.png"
        width={50}
        height={50}
        className="rounded-full"
        alt="Profile Picture"
      />
      <div className="overflow-hidden w-full">
      <Type type="lgBold">{userName}</Type>
      {children}
      </div>
    </div>
  );
}
