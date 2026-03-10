export interface IPlayer {
  id: number;
  nom: string;
  prenom: string;
  isGuest: boolean;
  clubId: number | null;
  createdAt: string;
  updatedAt: string;
}
