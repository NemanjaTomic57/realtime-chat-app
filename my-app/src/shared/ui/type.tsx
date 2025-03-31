import clsx from "clsx";

interface Props {
  type: "lgBold" | "lgGrey" | "sm" | "smGrey" | "xsGrey";
  className?: string;
  children: React.ReactNode;
}

export default function Type({ type, className, children }: Props) {
  const style = {
    lgBold: "text-lg font-bold",
    lgGrey: "text-lg text-tint",
    sm: "text-sm",
    smGrey: "text-sm text-tint",
    xsGrey: "text-xs text-tint",

  };

  return <h1 className={clsx(style[type], className)}>{children}</h1>;
}
