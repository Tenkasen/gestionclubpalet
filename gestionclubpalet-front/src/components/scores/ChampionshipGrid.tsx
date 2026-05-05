import { useState } from "react";
import type { IPlayer } from "../../types/player.ts";

interface IProps {
  player: IPlayer;
  onSave: (parties: IParties[]) => void;
  onNext: () => void;
}

interface IParties {
  pointsPour: number;
  pointsContre: number;
}

export default function ChampionshipGrid({
  player,
  onSave,
  onNext,
}: IProps) {
  const [parties, setParties] = useState<IParties[]>(
    Array(6).fill({ pointsPour: 0, pointsContre: 0 }),
  );

  const handleScoreClick = (
    partieIndex: number,
    pointsPour?: number,
    pointsContre?: number,
  ) => {
    const newParties = [...parties];

    if (pointsPour !== undefined && pointsPour !== 5) {
      newParties[partieIndex] = {
        pointsPour: pointsPour,
        pointsContre: 5,
      };
    } else {
      if (pointsContre !== undefined && pointsContre !== 5) {
        newParties[partieIndex] = {
          pointsPour: 5,
          pointsContre: pointsContre,
        };
      }
    }
    setParties(newParties);
  };

  const totalPointsPour = parties.reduce(
    (sum, points) => sum + points.pointsPour,
    0,
  );
  const totalPointsContre = parties.reduce(
    (sum, points) => sum + points.pointsContre,
    0,
  );
  const goalAverage = totalPointsPour - totalPointsContre;
  const nbVictoire = parties.filter(
    (partie) => partie.pointsPour > partie.pointsContre,
  ).length;
  return <div>ChampionshipGrid</div>;
}
