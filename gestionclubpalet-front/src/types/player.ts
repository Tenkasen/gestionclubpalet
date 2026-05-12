export interface IPlayer {
  id: number;
  nom: string;
  prenom: string;
  email?: string;
  telephone?: string;
  anniversaire?: string;
  dateInscription: string;
  isGuest: boolean;
  clubId: number | null;
  createdAt: string;
  updatedAt: string;
}
