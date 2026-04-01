import { useState, useRef, useEffect } from "react";
import type { IPlayer } from "../../types/player";

interface IProps {
  player: IPlayer;
  onSave: (score: {
    pointsPour: number;
    pointsContre: number;
  }) => void;
  onPrev: () => void;
  currentScore?: { pointsPour: number; pointsContre: number };
  isFirst: boolean;
  isLast: boolean;
}

export default function TrainingScoreInput({
  player,
  onSave,
  onPrev,
  currentScore,
  isFirst,
  isLast,
}: IProps) {
  const [pointsPour, SetPointsPour] = useState(
    currentScore?.pointsPour || 0,
  );
  const [pointsContre, SetPointsContre] = useState(
    currentScore?.pointsContre || 0,
  );
  const goalAverage = pointsPour - pointsContre;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSave({ pointsPour, pointsContre });
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    SetPointsPour(currentScore?.pointsPour ?? 0);
    SetPointsContre(currentScore?.pointsContre ?? 0);
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [player]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow"
    >
      <h3 className="text-xl font-bold mb-4">
        {player.nom} {player.prenom}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Points POUR
          </label>
          <input
            type="number"
            value={pointsPour}
            min={0}
            max={20}
            onChange={(e) => SetPointsPour(Number(e.target.value))}
            ref={inputRef}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label>Points CONTRE</label>
          <input
            type="number"
            value={pointsContre}
            min={0}
            max={20}
            required
            onChange={(e) => SetPointsContre(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="pt-4 border-t">
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
        </div>

        <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Précédent
        </button>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Suivant (Entrer)
        </button>
      </div>
    </form>
  );
}
