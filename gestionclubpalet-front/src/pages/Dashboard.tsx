import { Link } from "react-router-dom";
import { useSeasons } from "../hooks/useSeasons";
import { Medal, Target, Trophy } from "lucide-react";

export default function Dashboard() {
  const { seasons, loading, error } = useSeasons();

  if (loading) return <div>"Chargement en cours"</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Gestion Club Palet
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/seasons?type=ENTRAINEMENT"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <Target className="text-blue-600" size={48} />
              <h2 className="text-2xl font-bold text-gray-800">
                Entraînement
              </h2>
            </div>
            <p className="text-gray-600 italic">
              Gérer les scores d'entraînement et suivre la progression
            </p>
          </Link>
          <Link
            to="/seasons?type=CHAMPIONNAT"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <Medal className="text-yellow-600" size={48} />
              <h2 className="text-2xl font-bold text-gray-800">
                Championnat
              </h2>
            </div>
            <p className="text-gray-600 italic">
              Saisir les scores de championnat et consulter les
              classements
            </p>
          </Link>
          <Link
            to="/seasons?type=COUPE"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <Trophy className="text-slate-600" size={48} />
              <h2 className="text-2xl font-bold text-gray-800">
                Coupe
              </h2>
            </div>
            <p className="text-gray-600 italic">
              Gérer les matchs de coupe en doublette
            </p>
          </Link>
        </div>

        {/* Saisons récentes */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Saisons actives
          </h2>
          {seasons.length === 0 ? (
            <p className="text-gray-500">Aucune saison créée</p>
          ) : (
            <div className="space-y-3">
              {seasons.map((season) => (
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
    </div>
  );
}
