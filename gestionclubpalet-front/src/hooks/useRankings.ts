import { useEffect, useState } from "react";
import type { IRanking } from "../types/ranking";
import { rankingApi } from "../api/ranking.api";

export default function useRankings(
  seasonId: number,
  dayIndex?: number,
) {
  const [ranking, setRanking] = useState<IRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRanking = async () => {
    try {
      setLoading(true);
      if (dayIndex !== undefined) {
        const response = await rankingApi.getDayRanking(
          seasonId,
          dayIndex,
        );
        setRanking(response);
        setError(null);
        return;
      }

      const response = await rankingApi.getSeasonRanking(seasonId);
      setRanking(response);
      setError(null);
    } catch (error) {
      setError("Erreur lors du chargement du classement");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, [seasonId, dayIndex]);

  return { ranking, loading, error, refetch: fetchRanking };
}
