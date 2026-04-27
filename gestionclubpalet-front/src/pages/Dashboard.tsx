import { Link } from "react-router-dom";
import { useSeasons } from "../hooks/useSeasons";
import { Medal, Target, Trophy } from "lucide-react";
import DashboardCard from "../components/dashboard/DashboardCard";
import { RotatingLines } from "react-loader-spinner";
import PageError from "../components/feedback/PageError";

export default function Dashboard() {
  const { seasons, loading, error } = useSeasons();

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
  if (error) return <PageError errorMessage={error} />;

  return (
    <div className="container">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Gestion Club Palet
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <DashboardCard
          link="/seasons?type=ENTRAINEMENT"
          icon={Target}
          iconColor="text-blue-600"
          title="Entraînement"
          description="Gérer les scores d'entraînement et suivre la progression"
        />

        <DashboardCard
          link="/seasons?type=CHAMPIONNAT"
          icon={Medal}
          iconColor="text-yellow-600"
          title="Championnat"
          description="Saisir les scores de championnat et consulter les
              classements"
        />

        <DashboardCard
          link="/seasons?type=COUPE"
          icon={Trophy}
          iconColor="text-slate-600"
          title="Coupe"
          description="Gérer les matchs de coupe en doublette"
        />
      </div>

      {/* Saisons récentes */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Dernières saisons actives
        </h2>
        {seasons.length === 0 ? (
          <p className="text-gray-500">Aucune saison créée</p>
        ) : (
          <div className="space-y-3">
            {seasons.slice(0, 6).map((season) => (
              <Link
                key={season.id}
                to={`/seasons/${season.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {season.nom}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {season.type}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(season.dateDebut).toLocaleDateString(
                      "fr-FR",
                    )}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
