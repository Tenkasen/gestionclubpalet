import { useState } from "react";
import type { IPlayer } from "../../types/player.ts";
import { playerAPI } from "../../api/player.api.ts";
import { seasonRegistrationApi } from "../../api/seasonRegistration.api.ts";
import { toast } from "sonner";
import BaseModal from "../modals/BaseModal.tsx";
import CloseButton from "../ui/CloseButton.tsx";
import Button from "../ui/Button.tsx";

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
  const inputStyle =
    "border border-foreground-subtle rounded px-3 py-2 w-full";

  if (!isOpen) return null;
  return (
    <BaseModal maxWidth="max-w-xl">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-semibold text-title">
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
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Prénom</label>
            <input
              type="text"
              name="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Martin"
              className={inputStyle}
              required
            />
          </div>
        </div>
        <div className="mb-8">
          <label className={labelStyle}>Adresse mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mon-mail@email.com"
            className={inputStyle}
          />
        </div>
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <label className={labelStyle}>Date de naissance</label>
            <input
              type="date"
              value={anniversaire}
              onChange={(e) => setAnniversaire(e.target.value)}
              className={inputStyle}
            />
          </div>
          <div>
            <label className={labelStyle}>Numéro de téléphone</label>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="06 07 08 09 10"
              className={inputStyle}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <label className={labelStyle}>Date d'inscription</label>
            <input
              type="date"
              value={dateInscription}
              onChange={(e) => setDateInscription(e.target.value)}
              className={inputStyle}
            />
          </div>
        </div>
        <div className="flex justify-center gap-6">
          <Button type="submit" variant="confirm" disabled={loading}>
            {loading ? "Ajout en cours..." : "Ajouter le joueur"}
          </Button>
          <Button variant="cancel" onClick={resetForm}>
            Annuler
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}
