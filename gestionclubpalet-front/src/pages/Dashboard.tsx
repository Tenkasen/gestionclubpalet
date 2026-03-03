import { Link } from "react-router-dom";
import { useSeasons } from "../hooks/useSeasons";

export default function Dashboard() {
  const { seasons, loading, error } = useSeasons();

  if (loading) return <div>"Chargement en cours"</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div>
        <h1>Gestion Palet</h1>
        <div>
          <Link to="/">
            <div>🎯</div>
            <h3>Entraînement</h3>
          </Link>
          <Link to="/">
            <div>🏅</div>
            <h3>Championnat</h3>
          </Link>
          <Link to="/">
            <div>🏆</div>
            <h3>Coupe</h3>
          </Link>
        </div>
      </div>

      <h2>Saison active</h2>
      {seasons.length === 0 ? (
        <p>Aucune saison crée</p>
      ) : (
        <ul>
          {seasons.map((season) => (
            <li key={season.id}>
              <h3>{season.nom}</h3>
              <p>{season.type}</p>
              <p>
                {new Date(season.dateDebut).toLocaleDateString(
                  "fr-FR",
                )}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
