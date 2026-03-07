import type { ISeason } from "../types";
import { api } from "./client";

export const seasonsAPI = {
  async getAll(type?: string): Promise<ISeason[]> {
    const { data } = await api.get<ISeason[]>("/seasons", {
      params: type ? { type } : undefined,
    });
    return data;
  },
  async getOne(id: number): Promise<ISeason> {
    const { data } = await api.get<ISeason>(`/seasons/${id}`);
    return data;
  },

  async create(data: Partial<ISeason>): Promise<ISeason> {
    const { data: createdSeason } = await api.post<ISeason>(
      "/seasons",
      data,
    );
    return createdSeason;
  },
  async update(data: Partial<ISeason>): Promise<ISeason> {
    const { data: updatedSeason } = await api.patch<ISeason>(
      "/seasons",
      data,
    );
    return updatedSeason;
  },
  async destroy(id: number): Promise<ISeason> {
    return await api.delete(`/seasons/${id}`);
  },
};
