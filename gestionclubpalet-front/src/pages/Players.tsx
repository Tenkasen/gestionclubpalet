import { useEffect, useState } from "react";
import type { IPlayer } from "../types/player.ts";
import { playerAPI } from "../api/player.api.ts";
import PageLoading from "../components/feedback/PageLoading.tsx";
import PageError from "../components/feedback/PageError.tsx";
// import Header from "../components/layout/Header.tsx";
import { toast } from "sonner";
import HeaderTest from "../components/layout/HeaderTest.tsx";
import { sortPlayers } from "../utils/sortPlayer.ts";
import OptionsModal from "../components/players/OptionsModal.tsx";
import { usePlayerModal } from "../hooks/usePlayerModal.tsx";
import Button from "../components/ui/Button.tsx";

export default function Players() {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  const [modalPos, setModalPos] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const { openCreateModal, openEditModal, renderPlayerModal } =
    usePlayerModal();

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
    try {
      await playerAPI.delete(playerId);
      setPlayers((prev) =>
        prev.filter((player) => player.id !== playerId),
      );
      toast.success("Joueur supprimé avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la suppression du joueur.");
      console.error(error);
    }
  };

  const handlePlayerSaved = (player: IPlayer) => {
    setPlayers((prev) => {
      const existingPlayer = prev.some(
        (oldPlayer) => oldPlayer.id === player.id,
      );
      if (existingPlayer) {
        // Update : Replace existing player
        return sortPlayers(
          prev.map((oldPlayer) =>
            oldPlayer.id === player.id ? player : oldPlayer,
          ),
        );
      } else {
        return sortPlayers([...prev, player]);
      }
    });

    toast.success("Joueur enregistré avec succès !");
  };

  if (loading) return <PageLoading />;
  if (error) return <PageError error={error} />;

  return (
    <>
      {/* <Header /> */}
      <HeaderTest />
      <div className="container mx-auto ">
        <div className="pb-20">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-title tracking-tight">
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
              {/* add player button & form */}
              <Button onClick={openCreateModal} variant="confirm">
                Ajouter un licencié
              </Button>
            </div>
          </div>
          {/* player roster */}
          <div className="bg-roster-card/60 backdrop-blur-sm rounded-2xl border border-roster-border shadow-sm overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-roster-header-bg border-b border-roster-border">
                  <th className="text-left text-sm font-semibold tracking-widest uppercase text-roster-header-text px-3 py-3 w-14">
                    N°
                  </th>
                  <th className="text-left text-sm font-semibold tracking-widest uppercase text-roster-header-text px-2 py-3 w-44">
                    Nom
                  </th>
                  <th className="text-left text-sm font-semibold tracking-widest uppercase text-roster-header-text px-2 py-3 w-44">
                    Prénom
                  </th>
                  <th className="text-left text-sm font-semibold tracking-widest uppercase text-roster-header-text px-2 py-3 w-44">
                    Date d'inscription
                  </th>
                  <th className="w-10 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-roster-divide">
                {players.map((player, index) => (
                  <tr
                    key={player.id}
                    className="group hover:bg-roster-row-hover transition-colors duration-150"
                  >
                    <td className="px-3 py-3.5 text-sm font-mono text-roster-index-text">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="px-2 py-3.5 font-semibold text-roster-text truncate">
                      {player.nom}
                    </td>
                    <td className="px-2 py-3.5 text-roster-text truncate">
                      {player.prenom}
                    </td>
                    <td className="px-2 py-3.5 text-roster-text">
                      {new Date(
                        player.dateInscription,
                      ).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-2 py-3.5 text-center">
                      <button
                        type="button"
                        className="text-roster-action hover:text-roster-action-hover hover:cursor-pointer transition-colors relative z-40"
                        onClick={(e) => {
                          const rect =
                            e.currentTarget.getBoundingClientRect();
                          setModalPos({
                            top: rect.bottom - 35,
                            left: rect.right + 35,
                          });
                          setOpenId(player.id);
                        }}
                      >
                        <i className="fa-solid fa-ellipsis" />
                      </button>
                      {openId === player.id && (
                        <OptionsModal
                          top={modalPos.top}
                          left={modalPos.left}
                          player={player}
                          onDelete={handleDeletePlayer}
                          onEdit={openEditModal}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-roster-footer-text text-right">
            {players.length} joueur{players.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {openId && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpenId(null)}
        ></div>
      )}

      {renderPlayerModal({ onSave: handlePlayerSaved })}
    </>
  );
}
