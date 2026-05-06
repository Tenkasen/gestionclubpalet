import { useState } from "react";
import type { IPlayer } from "../types/player";

export interface IScore {
  pointsPour: number;
  pointsContre: number;
}

export default function useScoreEntry<TypeOfScore>(
  players: IPlayer[],
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<number, TypeOfScore>>(
    {},
  );

  function nextPlayer() {
    if (currentIndex < players.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function prevPlayer() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function saveScore(playerId: number, score: TypeOfScore) {
    setScores((prev) => ({ ...prev, [playerId]: score }));
  }
  return {
    currentPlayer: players[currentIndex] ?? null,
    currentIndex,
    nextPlayer,
    prevPlayer,
    saveScore,
    scores,
    isLast: currentIndex === players.length - 1,
    isFirst: currentIndex === 0,
  };
}
