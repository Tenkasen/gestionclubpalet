import { isAxiosError } from "axios";
import type { IPlayer } from "../types/player";
import { api } from "./client";
import type { IDayAttendance } from "../types/dayAttendance.ts";

export const dayAttendanceApi = {
  async getAll(
    seasonId: number,
    dayIndex: number,
  ): Promise<IPlayer[] | null> {
    try {
      const { data } = await api.get<{ playersList: IPlayer[] }>(
        `/seasons/${seasonId}/days/${dayIndex}/attendances`,
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
        "Erreur lors de la récupération des inscriptions à cette journée (dayAttendanceApi.getALL)",
        error,
      );
      throw error;
    }
  },
  async addPlayers(
    seasonId: number,
    dayIndex: number,
    playerIds: number[],
  ): Promise<IDayAttendance[] | null> {
    try {
      const { data: createdRegistration } = await api.post<
        IDayAttendance[]
      >(
        `/seasons/${seasonId}/days/${dayIndex}/attendances`,
        playerIds,
      );
      return createdRegistration;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn(
          "La saison, la journée ou le joueur n'existe pas.",
        );
        return null;
      }
      if (isAxiosError(error) && error.response?.status === 409) {
        console.warn("Ce joueur est déjà inscrit pour cette journée");
        return null;
      }
      console.error(
        "Erreur lors de la récupération des inscriptions à cette saison (dayAttendanceApi.create)",
        error,
      );
      throw error;
    }
  },
  async removePlayer(
    seasonId: number,
    dayIndex: number,
    playerId: number,
  ): Promise<string | null> {
    try {
      const { data } = await api.delete(
        `/seasons/${seasonId}/days/${dayIndex}/attendances/${playerId}`,
      );
      return data.message;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn(
          "La saison, la journée ou le joueur n'existe pas.",
        );
        return null;
      }
      console.error(
        "Erreur lors de la récupération du joueur (dayAttendanceApi.delete):",
        error,
      );
      throw error;
    }
  },
};
