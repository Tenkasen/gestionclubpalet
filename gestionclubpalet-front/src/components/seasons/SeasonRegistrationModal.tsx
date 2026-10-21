import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "../ui/Button.tsx";
import type { IPlayer } from "@/types/player.ts";
import { playerAPI } from "@/api/player.api.ts";
import PageLoading from "../feedback/PageLoading.tsx";
import PageError from "../feedback/PageError.tsx";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seasonId: number;
  registeredPlayerIds: number[];
  onRegistered: () => void;
}

export default function SeasonRegistrationModal({
  open,
  onOpenChange,
  seasonId,
  registeredPlayerIds,
  onRegistered,
}: Props) {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<
    number[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    async function fetchRegistration() {
      try {
        setLoading(true);
        const allPlayers = await playerAPI.getAll();
        setPlayers(allPlayers);
      } catch (error) {
        setError("Erreur lors du chargement des joueurs");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRegistration();
  }, [open]);

  if (loading) return <PageLoading />;
  if (error) return <PageError error={error} />;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"bg-surface"}>
        <DialogHeader>
          <DialogTitle className="text-title text-2xl">
            Créer une saison
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nom">Nom</Label>
            <Input
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateDebut">Date de début</Label>
            <Input
              id="dateDebut"
              type="date"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateFin">Date de fin (optionnel)</Label>
            <Input
              id="dateFin"
              type="date"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" variant="confirm" disabled={saving}>
              {saving ? "Création..." : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
