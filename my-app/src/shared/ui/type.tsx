import clsx from "clsx";

interface Props {
  type: "lgBold" | "lgGrey" | "sm";
  className?: string;
  children: React.ReactNode;
}

export default function Type({ type, className, children }: Props) {
  const style = {
    lgBold: "text-lg font-bold",
    lgGrey: "text-lg text-tint",
    sm: "text-sm",


  };

  return <h1 className={clsx(style[type], className)}>{children}</h1>;
}
