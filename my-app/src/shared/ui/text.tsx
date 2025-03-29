import clsx from "clsx";

interface Props {
  type: "sm";
  className?: string;
  children: React.ReactNode;
}

export default function Text({ type, className, children }: Props) {
  const style = {
    sm: "text-sm",
  };

  return <h1 className={clsx(style[type], className)}>{children}</h1>;
}
