import { useEffect, useState } from "react";
import type { IPlayer } from "../types/player.ts";
import { playerAPI } from "../api/player.api.ts";
import PageLoading from "../components/feedback/PageLoading.tsx";
import PageError from "../components/feedback/PageError.tsx";
import Header from "../components/layout/Header.tsx";

export default function Players() {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await playerAPI.getAll();
        if (!response) {
          return;
        }
        setPlayers(response);
        setError(null);
      } catch (error) {
        setError("Erreur lors de la récupération des joueurs");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  if (loading) return <PageLoading />;
  if (error) return <PageError error={error} />;

  return (
    <>
      <Header />
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 tracking-tight">
            Liste des joueurs
          </h1>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-emerald-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-emerald-700 border-b border-emerald-200">
                <th className="text-left text-sm font-semibold tracking-widest uppercase text-stone-300 px-5 py-3 w-14">
                  N°
                </th>
                <th className="text-left text-sm font-semibold tracking-widest uppercase text-stone-300 px-4 py-3">
                  Nom
                </th>
                <th className="text-left text-sm font-semibold tracking-widest uppercase text-stone-300 px-4 py-3">
                  Prénom
                </th>
                <th className="text-left text-sm font-semibold tracking-widest uppercase text-stone-300 px-4 py-3">
                  Date d'inscription
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100">
              {players.map((player, index) => (
                <tr
                  key={player.id}
                  className="group hover:bg-indigo-50 transition-colors duration-150"
                >
                  <td className="px-5 py-3.5 text-sm font-mono text-stone-500">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-emerald-900">
                    {player.nom}
                  </td>
                  <td className="px-4 py-3.5 text-emerald-900">
                    {player.prenom}
                  </td>
                  <td className="px-4 py-3.5 text-emerald-900">
                    {new Date(player.createdAt).toLocaleDateString(
                      "fr-FR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-emerald-400 text-right">
          {players.length} joueur{players.length > 1 ? "s" : ""}
        </p>
      </div>
    </>
  );
}
