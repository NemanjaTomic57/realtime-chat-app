import { IconType } from "react-icons";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const icons: { [key: string]: IconType } = {
  question: AiOutlineQuestionCircle,
};

interface Props {
  name: keyof typeof icons;
  size?: string;
  sizeComputed?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export default function Icon({ name, size, sizeComputed, color, className, onClick }: Props) {
  const SelectedIcon = icons[name];

  if (!SelectedIcon) console.warn("Icon not found: " + { name });

  if (!sizeComputed) {
    switch (size) {
      case "xs":
        sizeComputed = 16;
        break;

      case "sm":
        sizeComputed = 20;
        break;

      case "base":
        sizeComputed = 24;
        break;

      case "lg":
        sizeComputed = 30;
        break;

      default:
        break;
    }
  }

  return <SelectedIcon size={sizeComputed} color={color} className={className} onClick={onClick} />;
}
