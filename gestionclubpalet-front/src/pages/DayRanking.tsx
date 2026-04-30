import { useParams } from "react-router-dom";
import useRankings from "../hooks/useRankings";
import RankingTables from "../components/rankings/RankingTables";
import PageError from "../components/feedback/PageError";
import PageLoading from "../components/feedback/PageLoading";
import { seasonsAPI } from "../api/season.api";
import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import type { ISeason } from "../types/season";
import RankingExport from "../components/rankings/RankingExport";

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
      {/* Bouton discret en haut à droite du bloc */}
      <div className="p-3">
        <RankingExport
          elementId="ranking-export"
          filename={`classement-${season.type}-j${dayIdNumber}`}
        />
      </div>
      <div className="flex justify-center py-6">
        <div id="ranking-export" className=" p-1 w-fit">
          <h1 className="text-3xl font-bold pb-8 text-center px-6">
            {season.type} - {season.nom}
          </h1>
          <RankingTables
            data={ranking}
            type={season.type}
            dayNumber={dayIdNumber}
          />
        </div>
      </div>
    </>
  );
}
