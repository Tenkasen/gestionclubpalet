import { isAxiosError } from "axios";
import type { IRanking } from "../types/ranking";
import { api } from "./client";

export const rankingApi = {
  // ranking after a specific day
  async getDayRanking(
    seasonId: number,
    dayId: number,
  ): Promise<IRanking[] | null> {
    try {
      const { data } = await api.get<IRanking[]>(
        `/rankings/${seasonId}/days/${dayId}`,
      );
      return data;
    } catch (error: unknown) {
        if (isAxiosError(error) && error.response?.status === 404) {
                console.warn(`La saison ou la journée n'existe pas`);
                return null;
              }
              console.error(
                "Erreur lors de la récupération des inscriptions à cette saison (dayApi.getOne)",
                error,
              );
              throw error;
            }
    }
  },
};
