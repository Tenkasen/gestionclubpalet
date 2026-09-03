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
import { dayApi } from "../../api/day.api";
import type { IDay } from "../../types/day";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seasonId: number;
  onCreated: (day: IDay) => void;
}

export default function CreateDayDialog({
  open,
  onOpenChange,
  seasonId,
  onCreated,
}: Props) {
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date) {
      toast.error("La date est requise");
      return;
    }
    setSaving(true);
    try {
      const created = await dayApi.create(seasonId, { date: date });
      if (!created) {
        toast.error(
          "Une journée existe déjà à cette date, ou la saison n'existe pas",
        );
        return;
      }
      toast.success("Journée créée avec succès");
      onCreated(created);
      onOpenChange(false);
      setDate("");
    } catch (err) {
      toast.error("Erreur lors de la création de la journée");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une journée</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
