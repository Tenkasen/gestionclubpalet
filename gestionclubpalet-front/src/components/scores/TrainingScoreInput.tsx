import { useState, useRef, useEffect } from "react";
import type { IPlayer } from "../../types/player";
import { Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button.tsx";

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
  dayIndex: number;
}

export default function TrainingScoreInput({
  player,
  onSave,
  onPrev,
  currentScore,
  isFirst,
  isLast,
  seasonId,
  dayIndex,
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
      navigate(`/classements/${seasonId}/journées/${dayIndex}`);
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
      className="bg-surface p-8 rounded-xl shadow-md w-full max-w-md mx-auto mt-6"
    >
      <h3 className="text-xl font-bold text-foreground mb-6 text-center">
        {player.nom} {player.prenom}
      </h3>

      <div className="space-y-6">
        <div className="flex gap-6 justify-center">
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium text-foreground/80">
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
              className="w-20 text-foreground text-center px-3 py-2 border border-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-border-input/70"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium text-foreground/80">
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
              className="w-20 text-foreground text-center px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-border-input/70"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border-header text-center">
          <p className="text-sm text-foreground-muted mb-1">
            Goal Average
          </p>
          <span
            className={`text-2xl font-bold ${
              goalAverage >= 0
                ? "text-score-positive"
                : "text-score-negative"
            }`}
          >
            {goalAverage > 0 ? "+" : ""}
            {goalAverage}
          </span>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant={"previousPlayer"}
            onClick={onPrev}
            disabled={isFirst}
          >
            ← Joueur précédent
          </Button>
          <Button
            type="submit"
            variant={"nextPlayer"}
            disabled={isLast}
          >
            Joueur suivant →
          </Button>
        </div>
        {isLast && (
          <div className="flex items-center justify-center">
            <Button type="submit" variant={"save"}>
              <Save />
              Sauvegarder la journée
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
