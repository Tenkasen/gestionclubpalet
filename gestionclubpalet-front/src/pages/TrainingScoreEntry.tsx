import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dayApi } from "../api/day.api";
import { seasonRegistrationApi } from "../api/seasonRegistration.api";
import useScoreEntry, { type IScore } from "../hooks/useScoreEntry";
import { trainingScoreApi } from "../api/trainingScore.api";
import type { IDay } from "../types/day";
import type { IPlayer } from "../types/player";
import TrainingScoreInput from "../components/scores/TrainingScoreInput";
import type { ITrainingScore } from "../types/trainingScore";
import HeaderTest from "../components/layout/HeaderTest.tsx";
import PageLoading from "../components/feedback/PageLoading.tsx";
import PageError from "../components/feedback/PageError.tsx";
import { toast } from "sonner";
import { updatePlayerList } from "../utils/playerUtils.ts";
import Button from "../components/ui/Button.tsx";
import { usePlayerModal } from "../hooks/usePlayerModal.tsx";
import DayAttendanceModal from "../components/players/DayAttendanceModal.tsx";
import { dayAttendanceApi } from "../api/dayAttendances.api.ts";

export default function TrainingScoreEntry() {
  const { seasonId, dayIndex } = useParams();
  const [day, setDay] = useState<IDay | null>(null);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [initialScores, setInitialScores] = useState<
    ITrainingScore[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAttendanceModal, setShowAttendanceModal] =
    useState(false);
  const [presentPlayerIds, setPresentPlayerIds] = useState<number[]>(
    [],
  );
  const dayIndexNumber = Number(dayIndex);
  const seasonIdNumber = Number(seasonId);

  const { openCreateModal, renderPlayerModal } = usePlayerModal();

  useEffect(() => {
    async function loadData() {
      try {
        const dayData = await dayApi.getOne(
          seasonIdNumber,
          dayIndexNumber,
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
          dayIndexNumber,
        );

        setDay(dayData);
        setPlayers(playersData);
        setInitialScores(existingScores);

        const attendances = await dayAttendanceApi.getAll(
          seasonIdNumber,
          dayIndexNumber,
        );

        if (!attendances || attendances.length === 0) {
          setShowAttendanceModal(true); // open modal if no attendances
        } else {
          setPresentPlayerIds(attendances.map((player) => player.id));
        }
      } catch (error) {
        setError("Erreur lors de la récupération des données");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [seasonIdNumber, dayIndexNumber]);

  // filter players to display only present players
  const presentPlayers = presentPlayerIds
    .map((id) => players.find((player) => player.id === id))
    .filter((player) => player !== undefined);

  const {
    currentPlayer,
    currentIndex,
    nextPlayer,
    prevPlayer,
    saveScore,
    scores,
    isFirst,
    isLast,
  } = useScoreEntry<IScore>(presentPlayers);

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
      dayIndexNumber,
      { ...score, playerId: currentPlayer.id },
    );

    if (!registerScore) {
      setError("Erreur lors de l'enregistrement des scores");
      return;
    }

    saveScore(currentPlayer.id, score);
    nextPlayer();
  };

  const handlePlayerSaved = (player: IPlayer) => {
    setPlayers((prev) => updatePlayerList(prev, player));

    toast.success("Joueur enregistré avec succès !");
  };

  if (loading) return <PageLoading />;
  if (error) return <PageError error={error} />;
  return (
    <>
      <HeaderTest />
      <div className="container mx-auto py-10 max-w-md mb-6">
        <div className="flex justify-between">
          <h1 className="text-4xl text-title font-bold pb-2">
            Saisie Entraînement J{dayIndexNumber} -{" "}
            {day?.date
              ? new Date(day.date).toLocaleDateString("fr-FR")
              : ""}{" "}
          </h1>
          <div className="flex gap-6">
            <Button onClick={openCreateModal} variant="confirm">
              Ajouter un licencié
            </Button>
            <Button
              onClick={() => setShowAttendanceModal(true)}
              variant="confirm"
            >
              Gérer les présences
            </Button>
          </div>
        </div>
        <p className="text-foreground font-semibold text-lg">
          Joueur {currentIndex + 1} / {presentPlayers.length}
        </p>
        <div className="w-full bg-foreground-subtle/30 h-2 rounded mt-2">
          <div
            className="bg-progressbar h-2 rounded transition-all"
            style={{
              width: `${((currentIndex + 1) / presentPlayers.length) * 100}%`,
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
            seasonId={seasonIdNumber}
            dayIndex={dayIndexNumber}
          />
        )}
      </div>
      {renderPlayerModal({
        onSave: handlePlayerSaved,
        seasonId: seasonIdNumber,
      })}

      <DayAttendanceModal
        isOpen={showAttendanceModal}
        onClose={() => setShowAttendanceModal(false)}
        seasonId={seasonIdNumber}
        dayIndex={dayIndexNumber}
        allPlayers={players}
        onAttendanceSaved={(ids) => setPresentPlayerIds(ids)}
      />
    </>
  );
}
