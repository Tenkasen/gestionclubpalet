import { useState } from "react";
import type { IPlayer } from "../../types/player.ts";
import { useNavigate } from "react-router-dom";

interface IProps {
  player: IPlayer;
  onSave: (scores: { parties: IParties[] }) => void;
  onPrev: () => void;
  isLast: boolean;
  seasonId: number;
  dayId: number;
}

interface IParties {
  pointsPour: number;
  pointsContre: number;
}

export default function ChampionshipGrid({
  player,
  onSave,
  onPrev,
  isLast,
  seasonId,
  dayId,
}: IProps) {
  const [parties, setParties] = useState<IParties[]>(
    Array(6).fill({ pointsPour: 0, pointsContre: 0 }),
  );
  const navigate = useNavigate();

  //   Manage score entry
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

  //   Manage every stats
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

  //   Manage submission
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSave({ parties });
    if (isLast) {
      navigate(`/classements/${seasonId}/journées/${dayId}`);
    }
  };

  //   Check if all scores have been entered
  const allScoresfilled = parties.every(
    (point) => point.pointsPour > 0 || point.pointsContre > 0,
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto"
    >
      <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        {player.nom} {player.prenom}
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-6">
        {parties.map((partie, idx) => (
          <div
            key={idx}
            className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
          >
            <h4 className="font-bold text-lg mb-3 text-gray-700">
              Partie {idx + 1}
            </h4>

            {/* Sélection du score POUR */}
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2">
                Score marqué:
              </p>
              <div className="flex gap-2">
                {[5, 3, 2, 1, 0].map((score) => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => handleScoreClick(idx, score)}
                    className={`
                  flex-1 py-3 rounded-lg font-bold transition-all
                  ${
                    partie.pointsPour === score && score !== 4
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }
                `}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>

            {/* Affichage du résultat */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p
                className={`text-center font-bold ${
                  partie.pointsPour > partie.pointsContre
                    ? "text-green-600"
                    : partie.pointsContre > partie.pointsPour
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {partie.pointsPour} - {partie.pointsContre}
                {partie.pointsPour > partie.pointsContre && " ✓"}
                {partie.pointsContre > partie.pointsPour && " ✗"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Statistiques */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6 border border-blue-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total</p>
            <p className="text-3xl font-bold text-gray-800">
              {totalPointsPour} - {totalPointsContre}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Goal Average</p>
            <p
              className={`text-3xl font-bold ${
                goalAverage >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {goalAverage > 0 ? "+" : ""}
              {goalAverage}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Victoires</p>
            <p className="text-3xl font-bold text-blue-600">
              {nbVictoire}/6
            </p>
          </div>
        </div>
      </div>

      {/* Bouton de validation */}
      <button
        type="submit"
        disabled={!allScoresfilled}
        className={`
      w-full py-4 px-6 rounded-lg font-bold text-lg transition-all
      ${
        allScoresfilled
          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }
    `}
      >
        {allScoresfilled
          ? "Valider et passer au suivant"
          : "Complétez toutes les parties"}
      </button>

      <p className="text-sm text-gray-500 text-center mt-4">
        Cliquez sur les scores pour saisir les résultats
      </p>
    </form>
  );
}
