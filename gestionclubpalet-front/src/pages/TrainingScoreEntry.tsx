import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dayApi } from "../api/day.api";
import { seasonRegistrationApi } from "../api/seasonRegistration.api";
import { RotatingLines } from "react-loader-spinner";
import useScoreEntry, { type IScore } from "../hooks/useScoreEntry";
import { trainingScoreApi } from "../api/trainingScore.api";
import type { IDay } from "../types/day";
import type { IPlayer } from "../types/player";
import TrainingScoreInput from "../components/scores/TrainingScoreInput";
import type { ITrainingScore } from "../types/trainingScore";

export default function TrainingScoreEntry() {
  const { seasonId, dayId } = useParams();
  const [day, setDay] = useState<IDay | null>(null);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [initialScores, setInitialScores] = useState<
    ITrainingScore[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dayIdNumber = Number(dayId);
  const seasonIdNumber = Number(seasonId);

  const {
    currentPlayer,
    currentIndex,
    nextPlayer,
    prevPlayer,
    saveScore,
    scores,
    isLast,
    isFirst,
  } = useScoreEntry(players);

  useEffect(() => {
    async function loadData() {
      try {
        const dayData = await dayApi.getOne(
          seasonIdNumber,
          dayIdNumber,
        );
        const playersData =
          await seasonRegistrationApi.getAll(seasonIdNumber);

        if (!dayData || !playersData) {
          setError(
            "Erreur lors du chargement de la journée ou des données joueurs",
          );
          return;
        }

        const existingScores = await trainingScoreApi.getAll(
          seasonIdNumber,
          dayIdNumber,
        );

        setDay(dayData);
        setPlayers(playersData);
        setInitialScores(existingScores);
      } catch (error) {
        setError("Erreur lors de la récupération des données");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [seasonIdNumber, dayIdNumber]);

  // Load previously entered scores when the page is refreshed
  useEffect(() => {
    if (players.length === 0) return;
    if (initialScores === null) return;

    initialScores.forEach((score) => {
      saveScore(score.playerId, {
        pointsPour: score.pointsPour,
        pointsContre: score.pointsContre,
      });
    });
  }, [players, initialScores]);

  const handleSave = async (score: IScore) => {
    if (!currentPlayer) return;

    const registerScore = await trainingScoreApi.create(
      seasonIdNumber,
      dayIdNumber,
      { ...score, playerId: currentPlayer.id },
    );

    if (!registerScore) {
      setError("Erreur lors de l'enregistrement des scores");
      return;
    }

    saveScore(currentPlayer.id, score);
    nextPlayer();
  };

  if (loading)
    return (
      <div className="container flex flex-col justify-center items-center min-h-screen">
        <div className="text-2xl pb-6 ">"Chargement en cours"</div>
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="1.25"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  if (error) return <div>{error}</div>;
  return (
    <div className="container mx-auto py-10 max-w-md">
      <div className="mb-6">
        <h1 className="text-3xl font-bold pb-2">
          Saisie Entraînement J{dayIdNumber} -{" "}
          {day?.date
            ? new Date(day.date).toLocaleDateString("fr-FR")
            : ""}{" "}
        </h1>
        <p className="text-gray-600">
          Joueur {currentIndex + 1} / {players.length}
        </p>
        <div className="w-full bg-gray-200 h-2 rounded mt-2">
          <div
            className="bg-blue-600 h-2 rounded transition-all"
            style={{
              width: `${((currentIndex + 1) / players.length) * 100}%`,
            }}
          ></div>
        </div>

        {currentPlayer && (
          <TrainingScoreInput
            player={currentPlayer}
            onPrev={prevPlayer}
            onSave={handleSave}
            currentScore={scores[currentPlayer.id]}
            isFirst={isFirst}
            isLast={isLast}
          />
        )}
      </div>
    </div>
  );
}
