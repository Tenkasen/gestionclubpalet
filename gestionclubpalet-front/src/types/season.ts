import type { IDay } from "./day.ts";
import type { IPlayer } from "./player";
import type { ISeasonRegistration } from "./seasonRegistration.ts";

export interface ISeason {
  id: number;
  nom: string;
  type: "ENTRAINEMENT" | "CHAMPIONNAT" | "COUPE";
  dateDebut: string;
  dateFin: string | null;
  clubId: number | null;
  createdAt: string;
  updatedAt: string;
  days?: IDay[];
  registrations?: ISeasonRegistration[];

  daysCount?: number;
  registrationsCount?: number;
}

export interface ISeasonWithPlayers extends ISeason {
  registrations: ISeasonRegistrationWithPlayers[];
}

export interface ISeasonRegistrationWithPlayers {
  id: number;
  seasonId: number;
  playerId: number;
  createdAt: string;
  updatedAt: string;
  player: IPlayer;
}
