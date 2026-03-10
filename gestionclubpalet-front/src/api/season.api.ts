import { isAxiosError } from "axios";
import type { ISeason, ISeasonWithPlayers } from "../types/season";
import { api } from "./client";

export const seasonsAPI = {
  async getAll(type?: string): Promise<ISeason[]> {
    const { data } = await api.get<ISeason[]>("/seasons", {
      params: type ? { type } : undefined,
    });
    return data;
  },
  async getOne(id: number): Promise<ISeasonWithPlayers | null> {
    try {
      const { data } = await api.get<ISeasonWithPlayers>(
        `/seasons/${id}`,
      );

      return data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn(`La saison avec l'ID ${id} n'existe pas.`);
        return null;
      }
      console.error(
        "Erreur lors de la récupération de la saison :",
        error,
      );
      throw error;
    }
  },

  async create(data: Partial<ISeason>): Promise<ISeason | null> {
    try {
      const { data: createdSeason } = await api.post<ISeason>(
        "/seasons",
        data,
      );
      return createdSeason;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 409) {
        console.warn(
          `La saison avec le nom ${data.nom} existe déjà.`,
        );
        return error.response.data.season;
      }
      console.error(
        "Erreur lors de la récupération de la saison :",
        error,
      );
      throw error;
    }
  },
  async update(
    id: number,
    data: Partial<ISeason>,
  ): Promise<ISeason | null> {
    try {
      const { data: updatedSeason } = await api.patch<ISeason>(
        `/seasons/${id}`,
        data,
      );
      return updatedSeason;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn(`La saison avec l'ID ${id} n'existe pas.`);
        return null;
      }
      console.error(
        "Erreur lors de la récupération de la saison :",
        error,
      );
      throw error;
    }
  },

  async destroy(id: number): Promise<void> {
    try {
      const { data } = await api.delete(`/seasons/${id}`);
      return data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn(`La saison avec l'ID ${id} n'existe pas.`);
        return;
      }
      console.error(
        "Erreur lors de la récupération de la saison :",
        error,
      );
      throw error;
    }
  },
};
