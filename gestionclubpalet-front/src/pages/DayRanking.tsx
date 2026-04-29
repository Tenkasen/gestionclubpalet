import { useParams } from "react-router-dom";
import useRankings from "../hooks/useRankings";
import RankingTables from "../components/rankings/RankingTables";
import PageError from "../components/feedback/PageError";
import PageLoading from "../components/feedback/PageLoading";
import { seasonsAPI } from "../api/season.api";
import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import type { ISeason } from "../types/season";

export default function DayRanking() {
  const { seasonId, dayId } = useParams();

  const seasonIdNumber = Number(seasonId);
  const dayIdNumber = Number(dayId);
  const [season, setSeason] = useState<ISeason>();
  const [errorSeason, setErrorSeason] = useState<string | null>(null);

  const { ranking, loading, error } = useRankings(
    seasonIdNumber,
    dayIdNumber,
  );

  useEffect(() => {
    const getSeason = async () => {
      try {
        const response = await seasonsAPI.getOne(seasonIdNumber);
        if (!response) {
          return;
        }
        setSeason(response);
        setErrorSeason(null);
      } catch (error) {
        setErrorSeason("Erreur lors de la récupération de la saison");
        console.error(error);
      }
    };
    getSeason();
  }, [seasonId]);

  if (!seasonId || !dayId)
    return <PageError error="Paramètres manquant dans l'URL" />;
  if (loading) return <PageLoading />;
  if (!season) return <PageLoading />;
  if (errorSeason) return <PageError error={errorSeason} />;
  if (error) return <PageError error={error} />;

  return (
    <>
      <Header />
      <div className="container mx-auto py-10 max-w-md">
        <h1 className="text-3xl font-bold pb-8 text-center">
          {season.type} - {season.nom}
        </h1>

        <RankingTables
          data={ranking}
          type={season.type}
          dayNumber={dayIdNumber}
        />
      </div>
    </>
  );
}
