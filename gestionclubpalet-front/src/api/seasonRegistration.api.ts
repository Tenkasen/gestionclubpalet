import type { ISeasonRegistration } from "../types";
import { api } from "./client";

export const seasonRegistrationApi = {
  async getAll(seasonId: number): Promise<ISeasonRegistration[]> {
    const { data } = await api.get<ISeasonRegistration[]>(
      `/seasons/${seasonId}/players`,
    );
    return data;
  },
  async getOne(
    seasonId: number,
    playerId: number,
  ): Promise<ISeasonRegistration> {
    const { data } = await api.get<ISeasonRegistration>(
      `/seasons/${seasonId}/players/${playerId}`,
    );
    return data;
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
