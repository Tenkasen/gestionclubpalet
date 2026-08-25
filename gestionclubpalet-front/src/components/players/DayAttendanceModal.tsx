import { useEffect, useState } from "react";
import { dayAttendanceApi } from "../../api/dayAttendances.api.ts";
import type { IPlayer } from "../../types/player.ts";

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
  function handleSave() {}
  return <div>DayAttendanceModal</div>;
}
