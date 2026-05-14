import { Info, SquarePen, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";

interface IProps {
  top: number;
  left: number;
}
export default function OptionsModal({ top, left }: IProps) {
  const buttonStyle =
    "w-full flex items-center px-4 py-2 text-sm leading-5 text-stone-500 hover:bg-stone-100 hover:text-stone-700 cursor-pointer focus:outline-none focus:bg-stone-100 focus:text-stone-700";
  return createPortal(
    <div
      style={{ top, left }}
      className="fixed mt-2 py-1 z-50 rounded-md bg-white shadow-xs"
    >
      <button className={`${buttonStyle}`}>
        <SquarePen width={20} className="mr-2" />
        Éditer
      </button>
      <button className={`${buttonStyle}`}>
        <Info width={20} className="mr-2" />
        Informations
      </button>
      <button className={`${buttonStyle}`}>
        <Trash2 width={20} className="mr-2" />
        Supprimer
      </button>
    </div>,
    document.body,
  );
}
