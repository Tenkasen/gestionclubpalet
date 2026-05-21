import { useState } from "react";
import type { IPlayer } from "../../types/player.ts";
import { playerAPI } from "../../api/player.api.ts";
import { seasonRegistrationApi } from "../../api/seasonRegistration.api.ts";
import { toast } from "sonner";
import { X } from "lucide-react";
import BaseModal from "../modals/BaseModal.tsx";
import CloseButton from "../ui/CloseButton.tsx";

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
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [anniversaire, setAnniversaire] = useState<
    string | undefined
  >(undefined);
  const [telephone, setTelephone] = useState<string | undefined>(
    undefined,
  );
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
        email,
        anniversaire,
        telephone,
        dateInscription,
      });
      if (!newPlayer) return;
      onSave(newPlayer);
      if (seasonId) {
        await seasonRegistrationApi.create(seasonId, [newPlayer.id]);
      }
      resetForm();
    } catch (error) {
      setError(`${error}`);
      toast.error(` ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNom("");
    setPrenom("");
    setEmail(undefined);
    setAnniversaire(undefined);
    setTelephone(undefined);
    onClose();
  };

  const labelStyle = "block text-foreground mb-1";

  if (!isOpen) return null;
  return (
    <BaseModal maxWidth="max-w-xl">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-semibold text-indigo-800">
          Ajouter un licencié
        </h2>
        <CloseButton onClose={onClose} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <label className={labelStyle}>Nom</label>
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
        <div className="flex justify-center gap-6">
          <button
            type="submit"
            className="border border-white bg-blue-600 px-4 py-2 rounded-lg text-stone-100 hover:cursor-pointer hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? "Ajout en cours..." : "Ajouter le joueur"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 rounded-lg text-stone-600 border border-stone-400 hover:bg-stone-200 hover:cursor-pointer"
          >
            Annuler
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
