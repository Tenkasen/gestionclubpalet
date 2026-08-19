import { useState } from "react";
import type { IPlayer } from "../types/player.ts";
import AddPlayerModal from "../components/players/AddPlayerModal.tsx";

interface IPlayerModalProps {
  onSave: (player: IPlayer) => void;
  seasonId?: number;
}

export function usePlayerModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<
    IPlayer | undefined
  >(undefined);

  function openCreateModal() {
    setSelectedPlayer(undefined);
    setIsModalOpen(true);
  }

  function openEditModal(player: IPlayer) {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedPlayer(undefined);
  }

  function renderPlayerModal({
    onSave,
    seasonId,
  }: IPlayerModalProps) {
    return (
      <AddPlayerModal
        isOpen={isModalOpen}
        player={selectedPlayer}
        key={
          selectedPlayer
            ? `edit-player-${selectedPlayer.id}`
            : "new-player"
        }
        onClose={closeModal}
        onSave={onSave}
        seasonId={seasonId}
      />
    );
  }

  return {
    openCreateModal,
    openEditModal,
    closeModal,
    renderPlayerModal,
  };
}
