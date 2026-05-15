import { TriangleAlert, X } from "lucide-react";
import type { IPlayer } from "../../types/player.ts";

interface IProps {
  text: string;
  onClose: () => void;
  onDelete: (playerId: number) => void;
  player: IPlayer;
}

export default function ConfirmDeleteModal({
  text,
  onClose,
  onDelete,
  player,
}: IProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 cursor-default"
      onClick={(e) => e.stopPropagation()} // avoid modal to close when clicking outside
    >
      <div className="bg-stone-100 rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg mx-8 overflow-hidden">
        {/* Header */}
        <div className="bg-red-700 px-5 py-4 relative">
          <div className="flex items-center">
            <h2 className="text-white font-semibold text-xl leading-tight">
              Supprimer {text}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-stone-300 hover:text-white hover:bg-white/50 rounded-md p-1 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex justify-center flex-col items-center py-6">
          <div className="bg-red-200 rounded-[50%] p-6">
            <TriangleAlert size={64} className="text-red-700" />
          </div>
          <h2 className="text-2xl my-6 text-stone-600">
            Êtes-vous sûr de vouloir supprimer ?
          </h2>
          <p className="text-lg mb-6 text-stone-500">
            Cette action est irréversible et définitive
          </p>
          <div className="flex justify-center gap-6">
            <button
              className="border border-gray-200 bg-gray-300 px-4 py-2 rounded-lg text-stone-800 hover:cursor-pointer hover:bg-gray-400"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={() => onDelete(player.id)}
              className="px-4 py-2 rounded-lg text-white border border-red-400 bg-red-700 hover:bg-red-500 hover:cursor-pointer"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
