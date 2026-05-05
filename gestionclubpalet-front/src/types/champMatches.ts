import type { IPlayer } from "./player.ts";

export interface IChampMatches {
  id: number;
  dayId: number;
  playerId: number;
  partie1Pour: number;
  partie1Contre: number;
  partie2Pour: number;
  partie2Contre: number;
  partie3Pour: number;
  partie3Contre: number;
  partie4Pour: number;
  partie4Contre: number;
  partie5Pour: number;
  partie5Contre: number;
  partie6Pour: number;
  partie6Contre: number;
  totalPour: number;
  totalContre: number;
  nbVictoire: number;
  goalAverage: number;
  createdAt: string;
  updatedAt: string;
  player: IPlayer;
}
