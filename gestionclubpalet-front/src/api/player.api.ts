import { isAxiosError } from "axios";
import type { IPlayer } from "../types/player";
import { api } from "./client";

export const playerAPI = {
  async getAll(): Promise<IPlayer[]> {
    const { data } = await api.get<IPlayer[]>("/players");
    return data;
  },
  async getOne(id: number): Promise<IPlayer | null> {
    try {
      const { data } = await api.get<IPlayer>(`/players/${id}`);
      return data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn(`Le joueur avec l'ID ${id} n'existe pas`);
        return null;
      }
      console.error(
        "Erreur lors de la récupération du joueur (playerAPI.getOne) :",
        error,
      );
      throw error;
    }
  },
  async create(data: Partial<IPlayer>): Promise<IPlayer | null> {
    try {
      const { data: createdPlayer } = await api.post<{
        player: IPlayer;
      }>(`/players`, data);
      return createdPlayer.player;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 409) {
        console.warn(
          `Le joueur '${data.nom} ${data.prenom}' existe déjà`,
        );
        return error.response.data.player;
      }
      console.error(
        "Erreur lors de la récupération du joueur (playerAPI.create):",
        error,
      );
      throw error;
    }
  },
  async update(id: number, data: Partial<IPlayer>): Promise<IPlayer> {
    try {
      const { data: updatedPlayer } = await api.patch<{
        player: IPlayer;
      }>(`/players/${id}`, data);
      return updatedPlayer.player;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn(`Le joueur avec l'ID ${id} n'existe pas`);
        return error.response.data.player;
      }
      console.error(
        "Erreur lors de la récupération du joueur (playerAPI.update):",
        error,
      );
      throw error;
    }
  },
  async delete(id: number): Promise<string | null> {
    try {
      const { data } = await api.delete(`/players/${id}`);
      return data.message;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        console.warn(`Le joueur avec l'ID ${id} n'existe pas.`);
        return null;
      }
      console.error(
        "Erreur lors de la récupération du joueur (playerAPI.delete):",
        error,
      );
      throw error;
    }
  },
};
