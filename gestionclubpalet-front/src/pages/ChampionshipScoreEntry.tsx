import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dayApi } from "../api/day.api";
import { seasonRegistrationApi } from "../api/seasonRegistration.api";
import useScoreEntry, { type IScore } from "../hooks/useScoreEntry";
import type { IDay } from "../types/day";
import type { IPlayer } from "../types/player";
import ChampionshipGrid from "../components/scores/ChampionshipGrid.tsx";
import { champMatchesApi } from "../api/champMatches.api.ts";
import type { IChampMatches } from "../types/champMatches.ts";
import HeaderTest from "../components/layout/HeaderTest.tsx";
import { toast } from "sonner";
import { sortPlayers } from "../utils/sortPlayer.ts";
import PageLoading from "../components/feedback/PageLoading.tsx";
import PageError from "../components/feedback/PageError.tsx";
import { usePlayerModal } from "../hooks/usePlayerModal.tsx";
import Button from "../components/ui/Button.tsx";

export default function ChampionshipScoreEntry() {
  const { seasonId, dayIndex } = useParams();
  const [day, setDay] = useState<IDay | null>(null);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [initialScores, setInitialScores] = useState<
    IChampMatches[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dayIdNumber = Number(dayIndex);
  const seasonIdNumber = Number(seasonId);

  const {
    currentPlayer,
    currentIndex,
    nextPlayer,
    prevPlayer,
    saveScore,
    scores,
    isFirst,
    isLast,
  } = useScoreEntry<IScore[]>(players);

  const { openCreateModal, renderPlayerModal } = usePlayerModal();

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

        const existingScores = await champMatchesApi.getAll(
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
      const parties: IScore[] = [];
      for (let index = 1; index < 7; index++) {
        parties.push({
          pointsPour: score[
            `partie${index}Pour` as keyof IChampMatches
          ] as number, // ex : score["partie3Contre"] and get the value in the object
          pointsContre: score[
            `partie${index}Contre` as keyof IChampMatches
          ] as number,
        });
      }
      saveScore(score.playerId, parties);
    });
  }, [players, initialScores]);

  const handleSave = async (scores: { parties: IScore[] }) => {
    if (!currentPlayer) return;

    const registerScore = await champMatchesApi.create(
      seasonIdNumber,
      dayIdNumber,
      { ...scores, playerId: currentPlayer.id },
    );

    if (!registerScore) {
      setError("Erreur lors de l'enregistrement des scores");
      return;
    }

    saveScore(currentPlayer.id, scores.parties);
    nextPlayer();
  };

  const handlePlayerSaved = (player: IPlayer) => {
    setPlayers((prev) => sortPlayers([...prev, player]));

    toast.success("Joueur ajouté avec succès !");
  };

  if (loading) return <PageLoading />;
  if (error) return <PageError error={error} />;
  return (
    <>
      <HeaderTest />
      <div className="container mx-auto py-10 max-w-md mb-6">
        <div className="flex justify-between">
          <h1 className="text-4xl text-title font-bold pb-2">
            Saisie Championnat J{dayIdNumber} -{" "}
            {day?.date
              ? new Date(day.date).toLocaleDateString("fr-FR")
              : ""}{" "}
          </h1>
          <Button onClick={openCreateModal} variant="confirm">
            Ajouter un licencié
          </Button>
        </div>

        <p className="text-foreground font-semibold text-lg">
          Joueur {currentIndex + 1} / {players.length}
        </p>
        <div className="w-full bg-foreground-subtle/30 h-2 rounded mt-2">
          <div
            className="bg-progressbar h-2 rounded transition-all"
            style={{
              width: `${((currentIndex + 1) / players.length) * 100}%`,
            }}
          ></div>
        </div>

        {currentPlayer && (
          <ChampionshipGrid
            player={currentPlayer}
            onPrev={prevPlayer}
            onSave={handleSave}
            currentScore={scores[currentPlayer.id]}
            isFirst={isFirst}
            isLast={isLast}
            seasonId={seasonIdNumber}
            dayIndex={dayIdNumber}
          />
        )}
      </div>
      {renderPlayerModal({
        onSave: handlePlayerSaved,
        seasonId: seasonIdNumber,
      })}
    </>
  );
}
