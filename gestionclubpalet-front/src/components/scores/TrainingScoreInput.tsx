import { useState, useRef, useEffect } from "react";

interface IProps {
  player: Player;
  onSave: (score: { pour: number; contre: number }) => void;
  onNext: () => void;
  currentScore?: { pour: number; contre: number };
}

export default function TrainingScoreInput({
  player,
  onSave,
  onNext,
  currentScore,
}: IProps) {
  const [pour, SetPour] = useState(currentScore?.pour || 0);
  const [contre, SetContre] = useState(currentScore?.contre || 0);
  const goalAverage = pour - contre;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSave({ pour, contre });
    onNext();
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <h3>
        {player.nom} {player.prenom}
      </h3>
      <label>Points POUR</label>
      <input
        type="number"
        value={pour}
        min={0}
        max={20}
        onChange={(e) => SetPour(Number(e.target.value))}
        ref={inputRef}
        required
      />
      <label>Points CONTRE</label>

      <input
        type="number"
        value={contre}
        min={0}
        max={20}
        required
        onChange={(e) => SetContre(Number(e.target.value))}
      />
      <div className="pt-4 border-t"></div>
      <p className="text-lg">
        Goal Average :
        <span
          className={`font-bold ml-2 ${
            goalAverage >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {goalAverage > 0 ? "+" : ""}
          {goalAverage}
        </span>
      </p>
      <button type="submit">Suivant (Entrer)</button>
    </form>
  );
}
