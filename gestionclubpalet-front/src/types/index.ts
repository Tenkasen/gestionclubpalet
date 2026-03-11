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
