import { useEffect, useState } from "react";
import type { IPlayer } from "../types/player.ts";
import { playerAPI } from "../api/player.api.ts";
import PageLoading from "../components/feedback/PageLoading.tsx";
import PageError from "../components/feedback/PageError.tsx";
// import Header from "../components/layout/Header.tsx";
import { toast } from "sonner";
import HeaderTest from "../components/layout/HeaderTest.tsx";
import AddPlayerButton from "../components/players/AddPlayerButton.tsx";
import { sortPlayers } from "../utils/sortPlayer.ts";
import OptionsModal from "../components/players/OptionsModal.tsx";

export default function Players() {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);

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
    toast.success("Joueur supprimé avec succès !");
  };

  const handlePlayerSaved = (player: IPlayer) => {
    setPlayers((prev) => sortPlayers([...prev, player]));

    toast.success("Joueur ajouté avec succès !");
  };

  if (loading) return <PageLoading />;
  if (error) return <PageError error={error} />;

  return (
    <>
      {/* <Header /> */}
      <HeaderTest />
      <div className="container mx-auto px-6 py-12 ">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 tracking-tight">
            Liste des joueurs
          </h1>
        </div>

        {/* filters */}

        <div className="flex mb-8 justify-between">
          <div className="flex gap-6">
            {/* <div className="text-emerald-800 relative max-w-70 tracking-wider">
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
              <option value="valeur3">Saison 2025-2026</option>
            </select> */}
          </div>
          <div className="flex-end">
            <AddPlayerButton onSave={handlePlayerSaved} />

            {/* add player button & form */}
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
                    {new Date(
                      player.dateInscription,
                    ).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-2 py-3.5 text-center relative">
                    <button
                      type="button"
                      className="text-emerald-500 hover:text-emerald-800 hover:cursor-pointer transition-colors"
                      onClick={() =>
                        setOpen(open === player.id ? null : player.id)
                      }
                    >
                      <i className="fa-solid fa-ellipsis" />
                    </button>
                    {open === player.id && <OptionsModal />}
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

      {open && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpen(null)}
        ></div>
      )}
    </>
  );
}
