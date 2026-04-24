import { useParams } from "react-router-dom";
import useRankings from "../hooks/useRankings";
import { RotatingLines } from "react-loader-spinner";
import RankingTables from "../components/rankings/RankingTables";

export default function DayRanking() {
  const { seasonId, dayId } = useParams();

  const seasonIdNumber = Number(seasonId);
  const dayIdNumber = Number(dayId);

  const { ranking, loading, error } = useRankings(
    seasonIdNumber,
    dayIdNumber,
  );
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
      <h1 className="text-3xl font-bold pb-2">
        Classement J{dayIdNumber} -{" "}
      </h1>

      <RankingTables data={ranking} type="training" />
    </div>
  );
}
