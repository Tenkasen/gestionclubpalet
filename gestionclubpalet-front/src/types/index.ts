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
