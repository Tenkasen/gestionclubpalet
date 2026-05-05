import { isAxiosError } from "axios";
import type { IChampMatches } from "../types/champMatches.ts";

export const champMatchesApi = {
  async getAll(
    seasonId: number,
    dayId: number,
  ): Promise<IChampMatches[]> {
    try {
      const { data } = await api.get<IChampMatches>(
        `/seasons/${seasonId}/days/${dayId}/champ-matches`,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        throw new Error(`La saison ou la journée n'existe pas`);
      }
      console.error(
        "Erreur lors de la récupération des inscriptions à cette saison (rankingApi.getDayRanking)",
        error,
      );
      throw error;
    }
  },
};
