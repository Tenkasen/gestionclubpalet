import type { IPlayer } from "./player";
import type { ISeason } from "./season";

export interface ISeasonRegistration {
  id: number;
  seasonId: number;
  playerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPlayerRegistration {
  player: IPlayer;
  season: ISeason;
  registrationDate: string;
}
