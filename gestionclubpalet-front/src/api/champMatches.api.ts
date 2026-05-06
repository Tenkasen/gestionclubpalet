import { isAxiosError } from "axios";
import type { IChampMatches } from "../types/champMatches.ts";
import { api } from "./client.ts";

export const champMatchesApi = {
  async getAll(
    seasonId: number,
    dayIndex: number,
  ): Promise<IChampMatches[]> {
    try {
      const { data } = await api.get<IChampMatches[]>(
        `/seasons/${seasonId}/days/${dayIndex}/champ-matches`,
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

  async create(
    seasonId: number,
    dayId: number,
    data: Partial<IChampMatches>,
  ): Promise<IChampMatches | null> {
    try {
      const { data: createdChampMatches } =
        await api.post<IChampMatches>(
          `/seasons/${seasonId}/days/${dayId}/champ-matches`,
          data,
        );
      return createdChampMatches;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        throw new Error(`La saison ou la journée n'existe pas`);
      }
      console.error(
        "Erreur lors de la récupération des inscriptions à cette saison (champMatchesApi.create):",
        error,
      );
      throw error;
    }
  },
};
