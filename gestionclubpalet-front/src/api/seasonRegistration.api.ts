import { isAxiosError } from "axios";
import type { IPlayer } from "../types/player";
import { api } from "./client";
import type {
  IPlayerRegistration,
  ISeasonRegistration,
} from "../types/seasonRegistration";

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
    data: number[],
  ): Promise<ISeasonRegistration[] | null> {
    try {
      const { data: createdRegistration } = await api.post<
        ISeasonRegistration[]
      >(`/seasons/${seasonId}/players`, data);
      return createdRegistration;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn("La saison et/ou le joueur n'existe pas.");
        return null;
      }
      if (isAxiosError(error) && error.response?.status === 409) {
        console.warn("Ce joueur est déjà inscrit pour cette saison");
        return null;
      }
      console.error(
        "Erreur lors de la récupération des inscriptions à cette saison (seasonRegistrationApi.create)",
        error,
      );
      throw error;
    }
  },
  async update(
    seasonId: number,
    data: Partial<ISeasonRegistration>,
  ): Promise<ISeasonRegistration | null> {
    try {
      const { data: updatedRegistration } =
        await api.post<ISeasonRegistration>(
          `/seasons/${seasonId}/players`,
          data,
        );
      return updatedRegistration;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn("La saison et/ou le joueur n'existe pas.");
        return null;
      }
      if (isAxiosError(error) && error.response?.status === 409) {
        console.warn("Ce joueur est déjà inscrit pour cette saison");
        return null;
      }
      console.error(
        "Erreur lors de la récupération des inscriptions à cette saison (seasonRegistrationApi.update)",
        error,
      );
      throw error;
    }
  },
  async delete(
    seasonId: number,
    playerId: number,
  ): Promise<string | null> {
    try {
      const { data } = await api.delete(
        `/seasons/${seasonId}/players/${playerId}`,
      );
      return data.message;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn("La saison et/ou le joueur n'existe pas.");
        return null;
      }
      console.error(
        "Erreur lors de la récupération du joueur (seasonRegistration.delete):",
        error,
      );
      throw error;
    }
  },
};
