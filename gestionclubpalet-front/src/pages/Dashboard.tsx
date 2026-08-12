import { Link } from "react-router-dom";
import { useSeasons } from "../hooks/useSeasons";
import { Medal, Target, Trophy } from "lucide-react";
import DashboardCard from "../components/dashboard/DashboardCard";
import PageError from "../components/feedback/PageError";
import PageLoading from "../components/feedback/PageLoading";
import HeaderTest from "../components/layout/HeaderTest.tsx";
// import Header from "../components/layout/Header";

export default function Dashboard() {
  const { seasons, loading, error } = useSeasons();

  if (loading) return <PageLoading />;
  if (error) return <PageError error={error} />;

  return (
    <>
      {/* <Header /> */}
      <HeaderTest />

      <div className="container">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
          Gestion Club Palet
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <DashboardCard
            link="/saisons?type=ENTRAINEMENT"
            icon={<Target className="text-training" size={48} />}
            title="Entraînement"
            description="Gérer les scores d'entraînement et suivre la progression"
          />

          <DashboardCard
            link="/saisons?type=CHAMPIONNAT"
            icon={<Medal className="text-championship" size={48} />}
            title="Championnat"
            description="Saisir les scores de championnat et consulter les
              classements"
          />

          <DashboardCard
            link="/saisons?type=COUPE"
            icon={<Trophy className="text-cup" size={48} />}
            title="Coupe"
            description="Gérer les matchs de coupe en doublette"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <DashboardCard
            link="/classements/5/journées/1"
            icon={
              <i className="fa-duotone fa-solid fa-ranking-star fa-flip-horizontal text-4xl text-ranking" />
            }
            title="Classement"
            description="Voir les classements finaux ou pas journées des différentes saisons"
          />

          <DashboardCard
            link="/joueurs"
            icon={
              <i className="fa-duotone fa-solid fa-users text-4xl text-players"></i>
            }
            title="Liste des joueurs"
            description="Consulter la liste des tous les joueurs inscrit depuis la création du club ou alors classés par saison"
          />
        </div>

        {/* Saisons récentes */}
        <div className="bg-surface rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Dernières saisons actives
          </h2>
          {seasons.length === 0 ? (
            <p className="text-foreground-muted">
              Aucune saison créée
            </p>
          ) : (
            <div className="space-y-3">
              {seasons.slice(0, 6).map((season) => (
                <Link
                  key={season.id}
                  to={`/seasons/${season.id}`}
                  className="block p-4 border border-border rounded-lg hover:bg-foreground-subtle/15 transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-foreground">
                        {season.nom}
                      </h3>
                      <p className="text-sm text-foreground-muted">
                        {season.type}
                      </p>
                    </div>
                    <span className="text-sm text-foreground-muted">
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
    </>
  );
}
