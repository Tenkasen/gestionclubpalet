import { isAxiosError } from "axios";
import type { IPlayer } from "../types/player";
import { api } from "./client";
import type { IPlayerRegistration } from "../types/seasonRegistration";

export const seasonRegistrationApi = {
  async getAll(seasonId: number): Promise<IPlayer[] | null> {
    try {
      const { data } = await api.get<{ playersList: IPlayer[] }>(
        `/seasons/${seasonId}/players`,
      );
      return data.playersList;
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
    playerId: number,
  ): Promise<IPlayerRegistration | null> {
    try {
      const { data } = await api.get<IPlayerRegistration>(
        `/seasons/${seasonId}/players/${playerId}`,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn(
          "Aucune inscription trouvée pour cette saison et/ou ce joueur.",
        );
        return null;
      }
      console.error(
        "Erreur lors de la récupération des inscriptions à cette saison (seasonRegistrationApi.getOne)",
        error,
      );
      throw error;
    }
  },
  async create(
    seasonId: number,
    data: Partial<ISeasonRegistration>,
  ): Promise<ISeasonRegistration> {
    const { data: createdRegistration } =
      await api.post<ISeasonRegistration>(
        `/seasons/${seasonId}/players`,
        data,
      );
    return createdRegistration;
  },
  async update(
    seasonId: number,
    data: Partial<ISeasonRegistration>,
  ): Promise<ISeasonRegistration> {
    const { data: updatedRegistration } =
      await api.post<ISeasonRegistration>(
        `/seasons/${seasonId}/players`,
        data,
      );
    return updatedRegistration;
  },
  async delete(seasonId: number, playerId: number): Promise<void> {
    return await api.delete(
      `/seasons/${seasonId}/players/${playerId}`,
    );
  },
};
