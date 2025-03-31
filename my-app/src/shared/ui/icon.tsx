import { IconType } from "react-icons";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";
import { FaCheckDouble } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { RiContactsBook3Fill } from "react-icons/ri";

const icons: { [key: string]: IconType } = {
  question: AiOutlineQuestionCircle,
  contacts: RiContactsBook3Fill,
  settings: AiFillSetting,
  plus: FiPlus,
  close: MdClose,
  doubleCheck: FaCheckDouble,
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
