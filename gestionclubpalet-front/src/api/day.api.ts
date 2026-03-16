import { isAxiosError } from "axios";
import type { IDay } from "../types/day";
import { api } from "./client";

export const dayApi = {
  async getAll(seasonId: number): Promise<IDay[] | null> {
    try {
      const { data } = await api.get<IDay[]>(
        `/seasons/${seasonId}/days`,
      );
      return data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn(
          `La saison avec l'ID '${seasonId}' n'existe pas`,
        );
        return null;
      }
      console.error(
        "Erreur lors de la récupération des inscriptions à cette saison (seasonRegistrationApi.getALL)",
        error,
      );
      throw error;
    }
  },
  async getOne(
    seasonId: number,
    dayId: number,
  ): Promise<IDay | null> {
    try {
      const { data } = await api.get<IDay>(
        `/seasons/${seasonId}/days/${dayId}`,
      );
      return data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn(`La saison ou la journée n'existe pas`);
        return null;
      }
      console.error(
        "Erreur lors de la récupération des inscriptions à cette saison (seasonRegistrationApi.getALL)",
        error,
      );
      throw error;
    }
  },
  async create(seasonId: number, data: Partial<IDay>): Promise<IDay> {
    const { data: createdDay } = await api.post<IDay>(
      `/${seasonId}/days`,
      data,
    );
    return createdDay;
  },
};
