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
export interface IPlayer {
  id: number;
  nom: string;
  prenom: string;
  isGuest: boolean;
  clubId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ITrainingScore {
  id: number;
  dayId: number;
  playerId: number;
  pointsPour: number;
  pointsContre: number;
  goalAverage: number;
  createdAt: string;
  updatedAt: string;
}

export interface IDay {
  id: number;
  seasonId: number;
  indexJour: number;
  date: string;
  status: "DRAFT" | "VALIDATED" | "ARCHIVED";
  closed: boolean;
  createdAt: string;
  updatedAt: string;
}
