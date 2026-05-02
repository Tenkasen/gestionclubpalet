export interface IPlayer {
  id: number;
  nom: string;
  prenom: string;
  isGuest: boolean;
  clubId: number | null;
  createdAt: string;
  updatedAt: string;
}
export interface ICreatePlayer {
  nom: string;
  prenom: string;
  email?: string;
  tel?: string;
  isGuest: boolean;
}
