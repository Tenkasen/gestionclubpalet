import type { ITrainingScore } from "./trainingScore";

export interface IDay {
  id: number;
  seasonId: number;
  indexJour: number;
  date: string;
  status: "DRAFT" | "VALIDATED" | "ARCHIVED";
  closed: boolean;
  createdAt: string;
  updatedAt: string;
  trainingScores?: ITrainingScore[];
}
