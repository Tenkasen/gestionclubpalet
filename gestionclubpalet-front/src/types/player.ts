export interface IPlayer {
  id: number;
  nom: string;
  prenom: string;
  email?: string;
  telephone?: string;
  anniversaire?: Date;
  dateInscription: Date;
  isGuest: boolean;
  clubId: number | null;
  createdAt: string;
  updatedAt: string;
}
