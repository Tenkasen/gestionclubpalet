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
  player?: IPlayer;
}

export default function AddPlayerModal({
  isOpen,
  onClose,
  onSave,
  seasonId,
  player,
}: IProps) {
  const [nom, setNom] = useState(player?.nom || "");
  const [prenom, setPrenom] = useState(player?.prenom || "");
  const [email, setEmail] = useState<string>(player?.email || "");
  const [anniversaire, setAnniversaire] = useState<string>(
    player?.anniversaire ? player.anniversaire.split("T")[0] : "",
  );
  const [telephone, setTelephone] = useState<string>(
    player?.telephone || "",
  );
  const [dateInscription, setDateInscription] = useState(
    player?.dateInscription?.split("T")[0] ||
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
      let savedPlayer: IPlayer | null;
      // Nettoyer le numéro de téléphone avant l'envoi
      const cleanedTelephone =
        telephone?.replace(/ /g, "") || undefined;

      if (player) {
        savedPlayer = await playerAPI.update(player.id, {
          nom,
          prenom,
          email,
          anniversaire,
          telephone: cleanedTelephone,
          dateInscription,
        });
      } else {
        savedPlayer = await playerAPI.create({
          nom,
          prenom,
          email,
          anniversaire,
          telephone: cleanedTelephone,
          dateInscription,
        });
        if (savedPlayer && seasonId) {
          await seasonRegistrationApi.create(seasonId, [
            savedPlayer.id,
          ]);
        }
      }

      if (!savedPlayer) {
        toast.error("Erreur lors de l'enregistrement du joueur");
        return;
      }

      onSave(savedPlayer);
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
    setEmail("");
    setAnniversaire("");
    setTelephone("");
    onClose();
  };

  const isEditing = player ? true : false;
  function getButtonText(
    loading: boolean,
    isEditing: boolean,
  ): string {
    if (loading && isEditing) return "Modification en cours...";
    if (loading && !isEditing) return "Ajout en cours...";
    if (isEditing) return "Modifier le joueur";
    return "Ajouter le joueur";
  }

  const labelStyle = "block text-foreground mb-1";
  const inputStyle =
    "border border-foreground-subtle rounded px-3 py-2 w-full";

  if (!isOpen) return null;
  return (
    <BaseModal maxWidth="max-w-xl">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-semibold text-title">
          {isEditing ? "Modifier un licencié" : "Ajouter un licencié"}
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
            {getButtonText(loading, isEditing)}
          </Button>
          <Button variant="cancel" onClick={resetForm}>
            Annuler
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}
