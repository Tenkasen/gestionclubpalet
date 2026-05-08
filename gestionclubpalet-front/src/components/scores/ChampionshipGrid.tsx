import { useEffect, useState } from "react";
import type { IPlayer } from "../../types/player.ts";
import { useNavigate } from "react-router-dom";
import type { IScore } from "../../hooks/useScoreEntry.ts";
import { Save } from "lucide-react";

interface IProps {
  player: IPlayer;
  onSave: (scores: { parties: IScore[] }) => void;
  onPrev?: () => void;
  currentScore?: IScore[];
  isFirst: boolean;
  isLast: boolean;
  seasonId: number;
  dayIndex: number;
}

const possibleScores = [0, 1, 2, 3];

export default function ChampionshipGrid({
  player,
  onSave,
  onPrev,
  currentScore,
  isFirst,
  isLast,
  seasonId,
  dayIndex,
}: IProps) {
  const [parties, setParties] = useState<(IScore | null)[]>(
    currentScore ?? Array(6).fill(null),
  );
  const navigate = useNavigate();

  //   Manage score entry
  const handleScoreClick = (
    partieIndex: number,
    pointsPour?: number,
    pointsContre?: number,
  ) => {
    const newParties = [...parties];

    if (pointsPour !== undefined) {
      newParties[partieIndex] = {
        pointsPour: pointsPour,
        pointsContre: 5,
      };
    } else {
      if (pointsContre !== undefined) {
        newParties[partieIndex] = {
          pointsPour: 5,
          pointsContre: pointsContre,
        };
      }
    }
    setParties(newParties);
  };

  //   Check if all scores have been entered
  const filled = parties.filter((p): p is IScore => p !== null); // say p is type IScore if condition is true
  const allFilled = filled.length === 6;

  //   Manage every stats
  const totalPointsPour = filled.reduce(
    (sum, points) => sum + points.pointsPour,
    0,
  );
  const totalPointsContre = filled.reduce(
    (sum, points) => sum + points.pointsContre,
    0,
  );
  const goalAverage = totalPointsPour - totalPointsContre;
  const nbVictoire = filled.filter(
    (partie) => partie.pointsPour > partie.pointsContre,
  ).length;

  //   Manage submission
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!allFilled) return;
    onSave({ parties: parties as IScore[] });
    if (isLast && dayIndex === 10) {
      navigate(`/classements/${seasonId}`);
    } else if (isLast) {
      navigate(`/classements/${seasonId}/journées/${dayIndex}`);
    }
  };

  useEffect(() => {
    setParties(currentScore ?? Array(6).fill(null));
  }, [player]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto mt-6"
    >
      <h3 className="text-xl font-bold mb-6 text-center">
        {player.nom} {player.prenom}
      </h3>

      {/* Header colonnes */}
      <div className="grid grid-cols-[80px_1fr_1fr_110px] gap-2 mb-2 px-1">
        <span />
        <span className="text-center text-xs font-medium text-gray-400 uppercase tracking-wide">
          Points pour
        </span>
        <span className="text-center text-xs font-medium text-gray-400 uppercase tracking-wide">
          Points contre
        </span>
      </div>

      {/* Cartes parties */}
      {parties.map((partie, index) => {
        const isVictoire = partie?.pointsPour === 5;

        return (
          <div
            key={index}
            className={`grid grid-cols-[80px_1fr_1fr_110px] gap-2 items-center bg-white border rounded-xl px-3 py-2.5 mb-2 transition-colors ${
              partie ? "border-gray-400" : "border-gray-100"
            }`}
          >
            {/* Label partie */}
            <div className="font-medium text-gray-500">
              partie {index + 1}
            </div>

            {/* Boutons points pour */}
            <div className="flex gap-1.5 justify-center">
              {possibleScores.map((score) => {
                const isSelected =
                  partie !== null &&
                  !isVictoire &&
                  partie.pointsPour === score;
                return (
                  <button
                    type="button"
                    key={score}
                    onClick={() =>
                      handleScoreClick(index, score, undefined)
                    }
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all active:scale-95 cursor-pointer ${
                      isSelected
                        ? "bg-blue-700 text-white border border-blue-700"
                        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    {score}
                  </button>
                );
              })}
            </div>

            {/* Boutons points contre */}
            <div className="flex gap-1.5 justify-center">
              {possibleScores.map((score) => {
                const isSelected =
                  partie !== null &&
                  isVictoire &&
                  partie.pointsContre === score;
                return (
                  <button
                    type="button"
                    key={score}
                    onClick={() =>
                      handleScoreClick(index, undefined, score)
                    }
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all active:scale-95 cursor-pointer ${
                      isSelected
                        ? "bg-red-700 text-white border border-red-700"
                        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    {score}
                  </button>
                );
              })}
            </div>

            {/* Score résumé */}
            <div className="flex items-center gap-2 w-fit ">
              {partie && (
                <>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      isVictoire
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isVictoire ? "victoire" : "défaite"}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {partie.pointsPour} — {partie.pointsContre}
                  </span>
                </>
              )}
            </div>
          </div>
        );
      })}

      {/* Récap */}
      <div className="bg-gray-100 rounded-xl px-5 py-4 mt-4">
        <div className="grid grid-cols-4 gap-3 text-center">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Total pour
            </div>
            <div className="text-2xl font-medium text-blue-700">
              {totalPointsPour}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Total contre
            </div>
            <div className="text-2xl font-medium text-red-700">
              {totalPointsContre}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Goal avg
            </div>
            <div
              className={`text-2xl font-medium ${
                goalAverage > 0
                  ? "text-blue-700"
                  : goalAverage < 0
                    ? "text-red-700"
                    : "text-gray-600"
              }`}
            >
              {filled.length ? goalAverage : "—"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Victoires
            </div>
            <div className="text-2xl font-medium text-gray-800">
              {nbVictoire}/{parties.length}
            </div>
          </div>
        </div>
      </div>

      {/* Bouton validation */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
          onClick={onPrev}
          disabled={isFirst}
        >
          ← Joueur précédent
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
          disabled={isLast || !allFilled}
        >
          Joueur suivant →
        </button>
      </div>
      {isLast && (
        <div className="mt-4">
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-4 bg-teal-600 text-white text-xl px-3 py-2 rounded-lg hover:bg-teal-700 cursor-pointer text-sm font-medium"
            disabled={!allFilled}
          >
            <Save />
            Sauvegarder la journée
          </button>
        </div>
      )}
    </form>
  );
}
