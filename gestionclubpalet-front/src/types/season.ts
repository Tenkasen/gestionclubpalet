import type { IDay } from "./day.ts";
import type { IPlayer } from "./player";

export interface ISeason {
  id: number;
  nom: string;
  type: "ENTRAINEMENT" | "CHAMPIONNAT" | "COUPE";
  dateDebut: string;
  dateFin: string | null;
  clubId: number | null;
  createdAt: string;
  updatedAt: string;
  daysCount?: number;
  registrationsCount?: number;
  registrations?: ISeasonRegistration[];
  days?: IDay[];
}

export interface ISeasonRegistration {
  id: number;
  seasonId: number;
  playerId: number;
  createdAt: string;
  updatedAt: string;
  player: IPlayer;
}
