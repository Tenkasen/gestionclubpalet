import { useParams } from "react-router-dom";
import useRankings from "../hooks/useRankings";
import RankingTables from "../components/rankings/RankingTables";
import PageError from "../components/feedback/PageError";
import PageLoading from "../components/feedback/PageLoading";

export default function DayRanking() {
  const { seasonId, dayId } = useParams();

  const seasonIdNumber = Number(seasonId);
  const dayIdNumber = Number(dayId);

  const { ranking, loading, error } = useRankings(
    seasonIdNumber,
    dayIdNumber,
  );
  if (loading) return <PageLoading />;
  if (error) return <PageError error={error} />;

  return (
    <div className="container mx-auto py-10 max-w-md">
      <h1 className="text-3xl font-bold pb-8 text-center">
        Classement J{dayIdNumber}
      </h1>

      <RankingTables
        data={ranking}
        type="training"
        dayNumber={dayIdNumber}
      />
    </div>
  );
}
