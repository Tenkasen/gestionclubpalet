import type { IPlayer } from "../types";
import { api } from "./client";

export const playerAPI = {
  async getAll(): Promise<IPlayer[]> {
    const { data } = await api.get<IPlayer[]>("/players");
    return data;
  },
  async getOne(id: number): Promise<IPlayer> {
    const { data } = await api.get<IPlayer>(`/players/${id}`);
    return data;
  },
  async create(data: Partial<IPlayer>): Promise<IPlayer> {
    const { data: createdPlayer } = await api.post<IPlayer>(
      `/players`,
      data,
    );
    return createdPlayer;
  },
  async update(id: number, data: Partial<IPlayer>): Promise<IPlayer> {
    const { data: updatedPlayer } = await api.patch<IPlayer>(
      `/players/${id}`,
      data,
    );
    return updatedPlayer;
  },
  async delete(id: number): Promise<void> {
    return await api.delete(`/players/${id}`);
  },
};
