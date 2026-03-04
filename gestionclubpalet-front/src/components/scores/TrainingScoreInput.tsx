import { useState } from "react";

interface IProps {
  player: Player;
  onSave: () => void;
  onNext: () => void;
  currentScore?: { pour: number; contre: number };
}

export default function TrainingScoreInput({ player, onSave, onNext, currentScore }: IProps) {
  const [pour, SetPour] = useState(currentScore.pour? || 0);
  const [contre, SetContre] = useState(currentScore.contre? || 0);
  return <div>TrainingScoreInput</div>;
}
