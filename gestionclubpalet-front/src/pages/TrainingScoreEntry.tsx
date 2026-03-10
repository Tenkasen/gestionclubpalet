import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IDay, IPlayer } from "../types";
import { dayApi } from "../api/day.api";
import { seasonRegistrationApi } from "../api/seasonRegistration.api";

export default function TrainingScoreEntry() {
  const { seasonId, dayId } = useParams();
  const [day, setDay] = useState<IDay | null>(null);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const dayIdNumber = Number(dayId);
  const seasonIdNumber = Number(seasonId);

  useEffect(() => {
    async function loadData() {
      try {
        const dayData = await dayApi.getOne(
          seasonIdNumber,
          dayIdNumber,
        );
        setDay(dayData);
        const players =
          await seasonRegistrationApi.getAll(seasonIdNumber);
        setPlayers(response.players.playersList);
      } catch (error) {}
    }
    loadData();
  }, []);
  return <div>TrainingScoreEntry</div>;
}
