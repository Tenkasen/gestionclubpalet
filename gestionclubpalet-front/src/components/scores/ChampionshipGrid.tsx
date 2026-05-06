import { useState } from "react";
import type { IPlayer } from "../../types/player.ts";
import { useNavigate } from "react-router-dom";
import type { IScore } from "../../hooks/useScoreEntry.ts";

interface IProps {
  player: IPlayer;
  onSave: (scores: { parties: IScore[] }) => void;
  onPrev?: () => void;
  isLast: boolean;
  seasonId: number;
  dayIndex: number;
}

const possibleScores = [0, 1, 2, 3];

export default function ChampionshipGrid({
  player,
  onSave,
  onPrev,
  isLast,
  seasonId,
  dayIndex,
}: IProps) {
  const [parties, setParties] = useState<(IScore | null)[]>(
    Array(6).fill(null),
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
    if (isLast) {
      navigate(`/classements/${seasonId}/journées/${dayIndex}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-md w-full max-w-md mx-auto mt-6"
    >
      <h3 className="text-xl font-bold mb-6 text-center">
        {player.nom} {player.prenom}
      </h3>

      {/* Header colonnes */}
      <div className="grid grid-cols-[80px_1fr_1fr] gap-2 mb-2 px-1">
        <span />
        <span className="text-center text-xs font-medium text-gray-400 uppercase tracking-wide">
          points pour
        </span>
        <span className="text-center text-xs font-medium text-gray-400 uppercase tracking-wide">
          points contre
        </span>
      </div>

      {/* Cartes parties */}
      {parties.map((partie, index) => {
        const isVictoire = partie?.pointsPour === 5;

        return (
          <div
            key={index}
            className={`grid grid-cols-[80px_1fr_1fr] gap-2 items-center bg-white border rounded-xl px-3 py-2.5 mb-2 transition-colors ${
              partie ? "border-gray-300" : "border-gray-100"
            }`}
          >
            {/* Label partie */}
            <div className="text-xs font-medium text-gray-400">
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
                    key={score}
                    onClick={() => handleScoreClick(index, score)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all active:scale-95 ${
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
                    key={score}
                    onClick={() => handleScoreClick(index, score)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all active:scale-95 ${
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
            {partie && (
              <div className="col-span-3 flex items-center justify-center gap-2 mt-1">
                <span className="text-sm font-medium text-gray-500">
                  {partie.pointsPour} — {partie.pointsContre}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    isVictoire
                      ? "bg-blue-50 text-blue-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {isVictoire ? "victoire" : "défaite"}
                </span>
              </div>
            )}
          </div>
        );
      })}

      {/* Récap */}
      <div className="bg-gray-50 rounded-xl px-5 py-4 mt-4">
        <div className="grid grid-cols-4 gap-3 text-center">
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
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
              {filled.length
                ? goalAverage >= 0
                  ? `+${goalAverage}`
                  : goalAverage
                : "—"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Victoires
            </div>
            <div className="text-2xl font-medium text-gray-800">
              {nbVictoire}/{filled.length}
            </div>
          </div>
        </div>
      </div>

      {/* Bouton validation */}
      <button
        type="submit"
        disabled={!allFilled}
        className={`w-full mt-4 py-3 rounded-xl text-base font-medium transition-all ${
          allFilled
            ? "bg-blue-700 text-white hover:bg-blue-800 active:scale-99"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Valider les scores
      </button>
    </form>
  );
}
