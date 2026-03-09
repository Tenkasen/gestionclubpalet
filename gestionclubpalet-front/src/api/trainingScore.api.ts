import type { ITrainingScore } from "../types";
import { api } from "./client";

export const trainingScoreApi = {
  async getAll(dayId: number): Promise<ITrainingScore[]> {
    const { data } = await api.get<ITrainingScore[]>(
      `/days/${dayId}/training-scores`,
    );
    return data;
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
