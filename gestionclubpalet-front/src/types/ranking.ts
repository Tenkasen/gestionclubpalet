export interface IRanking {
  playerId: number;
  nom: string;
  prenom: string;
  presences: number;
  totalPour: number;
  totalContre: number;
  goalAverage: number;
  nbVictoire?: number;
  points: number;
  position: number;
}
