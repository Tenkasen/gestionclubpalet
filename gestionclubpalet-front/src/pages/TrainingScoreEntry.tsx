import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IDay, IPlayer } from "../types";
import { dayApi } from "../api/day.api";

export default function TrainingScoreEntry() {
  const { seasonId, dayId } = useParams();
  const [day, setDay] = useState<IDay | null>(null);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const dayIdNumber = Number(dayId);
  const seasonIdNumber = Number(seasonId);

  useEffect(() => {
    async function loadData() {
      const dayData = await dayApi.getOne(
        seasonIdNumber,
        dayIdNumber,
      );
      setDay(dayData);
    }
    loadData();
  }, []);
  return <div>TrainingScoreEntry</div>;
}
