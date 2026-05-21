import { X } from "lucide-react";

interface IProps {
  onClose: () => void;
  variant?: "light" | "dark";
}

const variants = {
  light: "text-btn-text-dark hover:bg-btn-delete/70",
  dark: "absolute top-3 right-3 text-btn-text-light hover:bg-surface/40",
};
export default function CloseButton({
  onClose,
  variant = "light",
}: IProps) {
  return (
    <button
      onClick={onClose}
      className={`rounded-md p-1 transition-colors cursor-pointer ${variants[variant]}`}
    >
      <X size={16} />
    </button>
  );
}
