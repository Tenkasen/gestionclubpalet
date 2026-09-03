import { useState } from "react";
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
import { seasonsAPI } from "../../api/season.api";
import type { ISeason } from "../../types/season";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: ISeason["type"];
  onCreated: (season: ISeason) => void;
}

export default function CreateSeasonDialog({
  open,
  onOpenChange,
  type,
  onCreated,
}: Props) {
  const [nom, setNom] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nom || !dateDebut) {
      toast.error("Nom et date de début sont requis");
      return;
    }
    setSaving(true);
    try {
      const created = await seasonsAPI.create({
        nom,
        type,
        dateDebut,
        dateFin: dateFin || null,
      });
      if (!created) {
        toast.error("Erreur lors de la création de la saison");
        return;
      }
      toast.success("Saison créée avec succès");
      onCreated(created);
      onOpenChange(false);
      setNom("");
      setDateDebut("");
      setDateFin("");
    } catch (err) {
      toast.error("Erreur lors de la création de la saison");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une saison</DialogTitle>
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
