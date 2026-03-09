import type { IDay } from "../types";
import { api } from "./client";

export const dayApi = {
  async getAll(seasonId: number): Promise<IDay[]> {
    const { data } = await api.get<IDay[]>(`/${seasonId}/days`);
    return data;
  },
  async getOne(seasonId: number, dayId: number): Promise<IDay> {
    const { data } = await api.get<IDay>(
      `/${seasonId}/days/${dayId}`,
    );
    return data;
  },
  async create(seasonId: number, data: Partial<IDay>): Promise<IDay> {
    const { data: createdDay } = await api.post<IDay>(
      `/${seasonId}/days`,
      data,
    );
    return createdDay;
  },
};
