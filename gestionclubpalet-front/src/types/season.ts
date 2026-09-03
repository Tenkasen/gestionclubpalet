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
