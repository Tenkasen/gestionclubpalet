import { useState } from "react";
import type { IPlayer } from "../../types/player.ts";
import { playerAPI } from "../../api/player.api.ts";
import { seasonRegistrationApi } from "../../api/seasonRegistration.api.ts";
import { toast } from "sonner";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (player: IPlayer) => void;
  seasonId?: number;
}

export default function AddPlayerModal({
  isOpen,
  onClose,
  onSave,
  seasonId,
}: IProps) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [anniversaire, setAnniversaire] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dateInscription, setDateInscription] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    try {
      e.preventDefault();
      setError(null);
      setLoading(true);

      const newPlayer = await playerAPI.create({
        nom,
        prenom,
        email: email || undefined,
        anniversaire: anniversaire ? anniversaire : undefined,
        telephone: telephone || undefined,
        dateInscription,
      });
      if (!newPlayer) return;
      if (seasonId) {
        await seasonRegistrationApi.create(seasonId, {
          playerId: newPlayer.id,
        });
      }
      onSave(newPlayer);
      onClose();
    } catch (error) {
      setError(`${error}`);
      toast.error(` ${error}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
        <div className="bg-stone-100 rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl mx-8 p-6">
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-2xl font-semibold text-indigo-800">
              Ajouter un licencié
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded hover:bg-red-500 transition-colors px-0.5"
            >
              <i className="fa-solid fa-xmark text-stone-700 text-sm"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-stone-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Dupont"
                  className="border border-stone-400 rounded px-3 py-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Martin"
                  className="border border-stone-400 rounded px-3 py-2 w-full"
                  required
                />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-stone-700 mb-1">
                Adresse mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={anniversaire}
                  onChange={(e) => setAnniversaire(e.target.value)}
                  className="border border-stone-400 rounded px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block text-stone-700 mb-1">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="06 07 08 09 10"
                  className="border border-stone-400 rounded px-3 py-2 w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <label className="block text-stone-700 mb-1">
                  Date d'inscription
                </label>
                <input
                  type="date"
                  value={dateInscription}
                  onChange={(e) => setDateInscription(e.target.value)}
                  className="border border-stone-400 rounded px-3 py-2 w-full"
                />
              </div>
            </div>
            <div className="flex justify-center gap-10 mb-6">
              <button
                type="submit"
                className="border border-white bg-blue-600 p-2 rounded-lg text-stone-100 hover:cursor-pointer hover:bg-blue-500"
                disabled={loading}
              >
                {loading ? "Ajout en cours..." : "Ajouter le joueur"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded text-stone-600 border border-stone-400 hover:bg-stone-200 hover:cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
