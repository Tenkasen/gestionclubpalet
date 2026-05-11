import { useEffect, useState } from "react";
import type { IChampMatches } from "../types/champMatches.ts";
import { champMatchesApi } from "../api/champMatches.api.ts";

export default function useDayTop3(
  seasonId: number,
  dayIndex: number,
) {
  const [top3, setTop3] = useState<IChampMatches[]>([]);
  useEffect(() => {
    const fetchTop3 = async () => {
      try {
        const response = await champMatchesApi.getAll(
          seasonId,
          dayIndex,
        );

        const dayRank = response.sort((a, b) => {
          // 1. Sort by descending points
          if (b.totalPour !== a.totalPour) {
            return b.totalPour - a.totalPour;
          }
          // 2. If tied, sort by goal average in descending order
          if (b.goalAverage !== a.goalAverage) {
            return b.goalAverage - a.goalAverage;
          }
          // 3. If tied, sort by victories in descending order
          if (b.nbVictoire !== a.nbVictoire) {
            return b.nbVictoire! - a.nbVictoire!;
          }
          // 4. If still equal, sort alphabetically
          return a.player.nom.localeCompare(b.player.nom, "fr");
        });

        const bestPlayers = dayRank.slice(0, 3);
        setTop3(bestPlayers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTop3();
  }, [seasonId, dayIndex]);

  return { top3 };
}
