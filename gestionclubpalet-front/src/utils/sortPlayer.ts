import type { IPlayer } from "../types/player.ts";

export function sortPlayers(player: IPlayer[]) {
  return player.sort((a, b) => {
    const nomCompare = a.nom.localeCompare(b.nom);
    if (nomCompare !== 0) return nomCompare;
    return a.prenom.localeCompare(b.prenom);
  });
}
