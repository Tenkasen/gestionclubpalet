import { useEffect, useState } from "react";
import { dayAttendanceApi } from "../../api/dayAttendances.api.ts";
import type { IPlayer } from "../../types/player.ts";
import { toast } from "sonner";

export interface IProps {
  isOpen: boolean;
  onClose: () => void;
  seasonId: number;
  dayIndex: number;
  allPlayers: IPlayer[]; // all season players
  onAttendanceSaved: (playerIds: number[]) => void;
}
export default function DayAttendanceModal({
  isOpen,
  onClose,
  seasonId,
  dayIndex,
  allPlayers,
  onAttendanceSaved,
}: IProps) {
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<
    number[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //   On loading, get players already present
  useEffect(() => {
    if (!isOpen) return;

    const fetchAttendances = async () => {
      try {
        const presentPlayers = await dayAttendanceApi.getAll(
          seasonId,
          dayIndex,
        );
        if (presentPlayers) {
          setSelectedPlayerIds(
            presentPlayers.map((player) => player.id),
          );
        }
      } catch (error) {
        setError("Erreur lors du chargement des présences");
        console.log(error);
      }
    };
    fetchAttendances();
  }, [isOpen, seasonId, dayIndex]);

  //   Toggle a player (check/uncheck)
  function togglePlayer(playerId: number) {
    setSelectedPlayerIds(
      (prev) =>
        prev.includes(playerId)
          ? prev.filter((id) => id !== playerId) // already checked => remove
          : [...prev, playerId], // unchecked => add
    );
  }

  //   Save attendances
  async function handleSave() {
    setLoading(true);
    setError(null);

    try {
      // 1. get actual attendances in DB
      const currentAttendances = await dayAttendanceApi.getAll(
        seasonId,
        dayIndex,
      );
      const currentIds =
        currentAttendances?.map((player) => player.id) || [];

      // 2. add a player (checked but not in DB)
      const playerToAdd = selectedPlayerIds.filter(
        (id) => !currentIds.includes(id),
      );
      // 3. remove a player (in DB but unchecked - missclick / error)
      const playerToRemove = currentIds.filter(
        (id) => !selectedPlayerIds.includes(id),
      );

      //   4. add new players
      if (playerToAdd.length > 0) {
        await dayAttendanceApi.addPlayers(
          seasonId,
          dayIndex,
          playerToAdd,
        );
      }

      //   4. remove player unchecked by missclick (rare)
      for (const playerId of playerToRemove) {
        await dayAttendanceApi.removePlayer(
          seasonId,
          dayIndex,
          playerId,
        );
      }
      toast.success("Présences enregistrées !");
      onAttendanceSaved(selectedPlayerIds);
      onClose();
    } catch (error) {
      setError("Erreur lors de la sauvegarde des présences");
      toast.error("Erreur lors de la sauvegarde");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;
  return <div>DayAttendanceModal</div>;
}
