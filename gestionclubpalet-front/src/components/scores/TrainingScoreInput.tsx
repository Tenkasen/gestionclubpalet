import { useState, useRef, useEffect } from "react";
import type { IPlayer } from "../../types/player";
import { Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  seasonId: number;
  dayId: number;
}

export default function TrainingScoreInput({
  player,
  onSave,
  onPrev,
  currentScore,
  isFirst,
  isLast,
  seasonId,
  dayId,
}: IProps) {
  const [pointsPour, SetPointsPour] = useState(
    currentScore?.pointsPour || 0,
  );
  const [pointsContre, SetPointsContre] = useState(
    currentScore?.pointsContre || 0,
  );
  const goalAverage = pointsPour - pointsContre;
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSave({ pointsPour, pointsContre });
    if (isLast) {
      navigate(`/classements/${seasonId}/journées/${dayId}`);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    SetPointsPour(currentScore?.pointsPour ?? 0);
    SetPointsContre(currentScore?.pointsContre ?? 0);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 50);
  }, [player]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-md w-full max-w-md mx-auto mt-6"
    >
      <h3 className="text-xl font-bold mb-6 text-center">
        {player.nom} {player.prenom}
      </h3>

      <div className="space-y-6">
        <div className="flex gap-6 justify-center">
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium text-gray-600">
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
              className="w-20 text-center px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium text-gray-600">
              Points CONTRE
            </label>
            <input
              type="number"
              value={pointsContre}
              min={0}
              max={20}
              required
              onChange={(e) =>
                SetPointsContre(Number(e.target.value))
              }
              className="w-20 text-center px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="pt-4 border-t text-center">
          <p className="text-sm text-gray-500 mb-1">Goal Average</p>
          <span
            className={`text-2xl font-bold ${
              goalAverage >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {goalAverage > 0 ? "+" : ""}
            {goalAverage}
          </span>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
            onClick={onPrev}
            disabled={isFirst}
          >
            ← Joueur précédent
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
            disabled={isLast}
          >
            Joueur suivant →
          </button>
        </div>
        {isLast && (
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="flex gap-4 bg-teal-600 text-white px-3 py-2 rounded-lg hover:bg-teal-700 cursor-pointer text-sm font-medium"
            >
              <Save />
              Sauvegarder la journée
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
