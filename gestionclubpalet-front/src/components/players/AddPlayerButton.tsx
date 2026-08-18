import { useState } from "react";
import type { IPlayer } from "../../types/player.ts";
import AddPlayerModal from "./AddPlayerModal.tsx";
import Button from "../ui/Button.tsx";

interface IProps {
  onSave: (player: IPlayer) => void;
  onClick?: () => void;
  seasonId?: number;
}
export default function AddPlayerButton({
  onSave,
  seasonId,
  onClick,
}: IProps) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={onClick} variant="confirm">
        Ajouter un licencié
      </Button>

      <AddPlayerModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={onSave}
        seasonId={seasonId}
      />
    </div>
  );
}
