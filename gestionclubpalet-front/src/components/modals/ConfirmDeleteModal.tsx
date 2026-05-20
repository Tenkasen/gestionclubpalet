import { TriangleAlert, X } from "lucide-react";
import type { IPlayer } from "../../types/player.ts";
import Button from "../ui/Button.tsx";

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
      className="fixed inset-0 flex items-center justify-center z-50 bg-overlay/80 cursor-default"
      onClick={(e) => e.stopPropagation()} // avoid modal to close when clicking outside
    >
      <div className="bg-background rounded-xl shadow-2xl border border-border w-full max-w-lg mx-8 overflow-hidden">
        {/* Header */}
        <div className="bg-btn-delete px-5 py-4 relative">
          <div className="flex items-center">
            <h2 className="text-surface font-semibold text-xl leading-tight">
              Supprimer {text}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-btn-text-light hover:bg-white/40 rounded-md p-1 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex justify-center flex-col items-center py-6">
          <div className="bg-danger-bg rounded-[50%] p-6">
            <TriangleAlert size={64} className="text-btn-delete" />
          </div>
          <h2 className="text-2xl my-6 text-foreground">
            Êtes-vous sûr de vouloir supprimer ?
          </h2>
          <p className="text-lg mb-6 text-foreground-muted">
            Cette action est irréversible et définitive
          </p>
          <div className="flex justify-center gap-6">
            <Button onClick={onClose} variant={"cancel"}>
              Annuler
            </Button>
            <Button
              onClick={() => onDelete(player.id)}
              variant={"delete"}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
