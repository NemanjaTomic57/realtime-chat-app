import clsx from "clsx";

interface Props {
  type: "h1" | "h2";
  className?: string;
  children: React.ReactNode;
}

export default function Heading({ type, className, children }: Props) {
    const style = {
        h1: "text-5xl font-semibold",
        h2: "text-2xl font-semibold",
    }

  return <h1 className={clsx(style[type], className)}>{children}</h1>;
}
