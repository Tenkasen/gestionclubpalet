import type { IPlayer } from "../types/player.ts";

export function sortPlayers(player: IPlayer[]) {
  const duplicateArray = [...player];
  return duplicateArray.sort((a, b) => {
    const nomCompare = a.nom.localeCompare(b.nom);
    if (nomCompare !== 0) return nomCompare;
    return a.prenom.localeCompare(b.prenom);
  });
}

export function updatePlayerList(
  prev: IPlayer[],
  player: IPlayer,
): IPlayer[] {
  const existingPlayer = prev.some(
    (oldPlayer) => oldPlayer.id === player.id,
  );
  if (existingPlayer) {
    // Update : Replace existing player
    return sortPlayers(
      prev.map((oldPlayer) =>
        oldPlayer.id === player.id ? player : oldPlayer,
      ),
    );
  } else {
    return sortPlayers([...prev, player]);
  }
}
