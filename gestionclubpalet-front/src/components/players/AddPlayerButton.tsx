import { useState } from "react";
import type { IPlayer } from "../../types/player.ts";
import AddPlayerModal from "./AddPlayerModal.tsx";

interface IProps {
  onSave: (player: IPlayer) => void;
  seasonId?: number;
}
export default function AddPlayerButton({
  onSave,
  seasonId,
}: IProps) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        className="relative border border-white bg-blue-600 p-2 rounded-lg text-stone-200 hover:cursor-pointer hover:bg-blue-500"
        onClick={() => setOpen(true)}
      >
        Ajouter un licencié
      </button>

      <AddPlayerModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={onSave}
        seasonId={seasonId}
      />
    </div>
  );
}
