import { isAxiosError } from "axios";
import type { ITrainingScore } from "../types";
import { api } from "./client";

export const trainingScoreApi = {
  async getAll(
    seasonId: number,
    dayId: number,
  ): Promise<ITrainingScore[] | null> {
    try {
      const { data } = await api.get<ITrainingScore[]>(
        `/seasons/${seasonId}/days/${dayId}/training-scores`,
      );
      return data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn(
          `Cette saison et/ou cette journée dans cette saison n'existe pas`,
        );
        return null;
      }
      console.error(
        "Erreur lors de la récupération des inscriptions à cette saison (trainingScoreApi.getALL)",
        error,
      );
      throw error;
    }
  },
  async create(
    dayId: number,
    data: Partial<ITrainingScore>,
  ): Promise<ITrainingScore> {
    const { data: createdTrainingScore } =
      await api.post<ITrainingScore>(
        `/days/${dayId}/training-scores`,
        data,
      );
    return createdTrainingScore;
  },
};
