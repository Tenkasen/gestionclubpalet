import type { IPlayer } from "./player";

export interface ITrainingScore {
  id: number;
  dayId: number;
  playerId: number;
  pointsPour: number;
  pointsContre: number;
  goalAverage: number;
  createdAt: string;
  updatedAt: string;
  player?: IPlayer;
}
