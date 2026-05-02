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
  const [open, setOpen] = useState(false);

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

  const handleDeletePlayer = async (playerId: number) => {
    await playerAPI.delete(playerId);
    setPlayers((prev) =>
      prev.filter((player) => player.id !== playerId),
    );
  };
  const handleAddPlayer = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const newPlayer = await playerAPI.create(data);
    setPlayers((prev) =>
      prev.filter((player) => player.id !== playerId),
    );
  };

  if (loading) return <PageLoading />;
  if (error) return <PageError error={error} />;

  return (
    <>
      <Header />
      <div className="container mx-auto px-6 py-12 ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 tracking-tight">
            Liste des joueurs
          </h1>
        </div>

        {/* filters */}

        <div className="flex mb-8 justify-between">
          <div className="flex gap-6">
            <div className="text-emerald-800 relative max-w-70 tracking-wider">
              <form className="flex gap-2 ">
                <button
                  type="submit"
                  aria-label="soumettre la recherche"
                >
                  <i className="fas fa-search absolute left-3 -translate-y-1/2 pl-2"></i>
                </button>
                <input
                  type="text"
                  placeholder="Chercher un joueur"
                  className="border border-stone-800 rounded px-3 py-2 w-full pl-10 placeholder-stone-400 "
                />
              </form>
            </div>
            <select
              className="w-fit p-2 text-emerald-800"
              id="monselect"
            >
              <option value="valeur1">Licencié par saison</option>
              <option value="valeur3">Valeur 3</option>
            </select>
          </div>
          <div className="flex-end">
            <button
              type="button"
              className="relative border border-white bg-blue-600 p-2 rounded-lg text-stone-200 hover:cursor-pointer hover:bg-blue-500"
              onClick={() => setOpen(true)}
            >
              Ajouter un licencié
            </button>

            {/* add player form */}

            {open && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
                <div className="bg-stone-100 rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl mx-8 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-indigo-800">
                      Ajouter un licencié
                    </h2>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="cursor-pointer border border-1 border-stone-600 bg-red-600 px-2 text-stone-600 hover:text-stone-500 hover:bg-red-400 transition-colors"
                    >
                      X
                    </button>
                  </div>
                  <form>
                    <div className="grid grid-cols-2 gap-8 mb-8">
                      <div>
                        <label className="block text-stone-700 mb-1">
                          Nom
                        </label>
                        <input
                          type="text"
                          placeholder="Votre Nom"
                          className="border border-stone-400 rounded px-3 py-2 w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-700 mb-1">
                          Prénom
                        </label>
                        <input
                          type="text"
                          placeholder="Votre Prénom"
                          className="border border-stone-400 rounded px-3 py-2 w-full"
                        />
                      </div>
                    </div>
                    <div className="mb-8">
                      <label className="block text-stone-700 mb-1">
                        Adresse mail
                      </label>
                      <input
                        type="email"
                        placeholder="mon-mail@email.com"
                        className="border border-stone-400 rounded px-3 py-2 w-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-8 mb-10">
                      <div>
                        <label className="block text-stone-700 mb-1">
                          Date de naissance
                        </label>
                        <input
                          type="date"
                          className="border border-stone-400 rounded px-3 py-2 w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-700 mb-1">
                          Numéro de téléphone
                        </label>
                        <input
                          type="tel"
                          placeholder="06 07 08 09 10"
                          className="border border-stone-400 rounded px-3 py-2 w-full"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center gap-10 mb-6">
                      <button
                        type="submit"
                        className="border border-white bg-blue-600 p-2 rounded-lg text-stone-100 hover:cursor-pointer hover:bg-blue-500"
                      >
                        Sauvegarder
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 rounded text-stone-600 border border-stone-400 hover:bg-stone-200 hover:cursor-pointer"
                        onClick={() => setOpen(false)}
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* player roster */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-emerald-200 shadow-sm overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-emerald-700 border-b border-emerald-200">
                <th className="text-left text-sm font-semibold tracking-widest uppercase text-stone-200 px-3 py-3 w-14">
                  N°
                </th>
                <th className="text-left text-sm font-semibold tracking-widest uppercase text-stone-200 px-2 py-3 w-44">
                  Nom
                </th>
                <th className="text-left text-sm font-semibold tracking-widest uppercase text-stone-200 px-2 py-3 w-44">
                  Prénom
                </th>
                <th className="text-left text-sm font-semibold tracking-widest uppercase text-stone-200 px-2 py-3 w-44">
                  Date d'inscription
                </th>
                <th className="w-10 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100">
              {players.map((player, index) => (
                <tr
                  key={player.id}
                  className="group hover:bg-indigo-50 transition-colors duration-150"
                >
                  <td className="px-3 py-3.5 text-sm font-mono text-stone-500">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-2 py-3.5 font-semibold text-emerald-900 truncate">
                    {player.nom}
                  </td>
                  <td className="px-2 py-3.5 text-emerald-900 truncate">
                    {player.prenom}
                  </td>
                  <td className="px-2 py-3.5 text-emerald-900">
                    {new Date(player.createdAt).toLocaleDateString(
                      "fr-FR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </td>
                  <td className="px-2 py-3.5 text-center">
                    <button
                      type="button"
                      className="text-emerald-500 hover:text-emerald-800 hover:cursor-pointer transition-colors"
                      onClick={() => handleDeletePlayer(player.id)}
                    >
                      <i className="fa-solid fa-ellipsis" />
                    </button>
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
