import type { IPlayer } from "../../types/player.ts";
import Button from "../ui/Button.tsx";
import BaseModal from "./BaseModal.tsx";
import CloseButton from "../ui/CloseButton.tsx";
import { TriangleAlert } from "lucide-react";

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
    <BaseModal
      onClick={(e) => e.stopPropagation()}
      variant="delete"
      maxWidth="max-w-lg"
    >
      {/* Header */}
      <div className="bg-btn-delete px-5 py-4 relative">
        <div className="flex items-center">
          <h2 className="text-surface font-semibold text-xl leading-tight">
            Supprimer {text}
          </h2>
        </div>
        <CloseButton onClose={onClose} variant="dark" />
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
    </BaseModal>
  );
}
