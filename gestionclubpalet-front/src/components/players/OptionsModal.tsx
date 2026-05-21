import { Info, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import PlayerInfosModal from "./PlayerInfosModal.tsx";
import type { IPlayer } from "../../types/player.ts";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal.tsx";

interface IProps {
  top: number;
  left: number;
  player: IPlayer;
  onDelete: (playerId: number) => void;
}
export default function OptionsModal({
  top,
  left,
  player,
  onDelete,
}: IProps) {
  const [showInfos, setShowInfos] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const buttonStyle =
    "w-full flex items-center px-4 py-2 text-sm leading-5 text-foreground-muted hover:bg-border/50 hover:text-foreground hover:cursor-pointer focus:outline-none focus:bg-border/50 focus:text-foreground";
  return createPortal(
    <>
      <div
        style={{ top, left }}
        className="fixed mt-2 py-1 z-50 rounded-md bg-surface shadow-xs"
      >
        <button className={buttonStyle}>
          <SquarePen width={20} className="mr-2" />
          Éditer
        </button>
        <button
          className={`${buttonStyle}`}
          onClick={() => setShowInfos(true)}
        >
          <Info width={20} className="mr-2" />
          Informations
        </button>
        <button
          className={`${buttonStyle}`}
          onClick={() => setShowDelete(true)}
        >
          <Trash2 width={20} className="mr-2" />
          Supprimer
        </button>
      </div>
      {showInfos && (
        <PlayerInfosModal
          player={player}
          onClose={() => setShowInfos(false)}
        />
      )}
      {showDelete && (
        <ConfirmDeleteModal
          text={"le joueur"}
          onClose={() => setShowDelete(false)}
          onDelete={onDelete}
          player={player}
        />
      )}
    </>,
    document.body,
  );
}
