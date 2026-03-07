import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IPlayer } from "../types";

export default function TrainingScoreEntry() {
  const { dayId } = useParams();
  const [day, setDay] = useState(null);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const dayIdNumber = Number(dayId);

  useEffect(() => {
    async function loadData(){
        const dayData = 
    }
  }, []);
  return <div>TrainingScoreEntry</div>;
}
