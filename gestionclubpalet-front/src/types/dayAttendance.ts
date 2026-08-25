import type { IPlayer } from "./player.ts";

export interface IDayAttendance {
  id: number;
  dayId: number;
  playerId: number;
  createdAt: string;
  updatedAt: string;
  player?: IPlayer;
}
