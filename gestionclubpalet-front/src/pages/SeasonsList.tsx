import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { seasonsAPI } from "../api/season.api";
import type { ISeason } from "../types/season";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Button from "../components/ui/Button.tsx";
import CreateSeasonDialog from "../components/seasons/CreateSeasonDialog";
import PageLoading from "../components/feedback/PageLoading.tsx";
import PageError from "../components/feedback/PageError.tsx";

const TYPE_LABELS: Record<ISeason["type"], string> = {
  ENTRAINEMENT: "Entraînement",
  CHAMPIONNAT: "Championnat",
  COUPE: "Coupe",
};

interface Props {
  type: ISeason["type"];
}

export default function SeasonsList({ type }: Props) {
  const [seasons, setSeasons] = useState<ISeason[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    setLoading(true);
    seasonsAPI
      .getAll(type)
      .then(setSeasons)
      .catch((err) => {
        setError("Erreur lors du chargement des saisons");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [type]);

  if (loading) return <PageLoading />;
  if (error) return <PageError error={error} />;

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl text-title font-bold">
          Saisons — {TYPE_LABELS[type]}
        </h1>
        <Button
          variant="confirm"
          onClick={() => setShowCreateDialog(true)}
        >
          Créer une saison
        </Button>
      </div>

      {seasons.length === 0 && (
        <p className="text-foreground-subtle">
          Aucune saison pour l'instant.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {seasons.map((season) => (
          <Link key={season.id} to={`/saisons/${season.id}`}>
            <Card className="hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{season.nom}</CardTitle>
                  <Badge
                    variant={season.dateFin ? "secondary" : "default"}
                  >
                    {season.dateFin ? "Terminée" : "En cours"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-subtle">
                  Du{" "}
                  {new Date(season.dateDebut).toLocaleDateString(
                    "fr-FR",
                  )}
                  {season.dateFin
                    ? ` au ${new Date(season.dateFin).toLocaleDateString("fr-FR")}`
                    : ""}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <CreateSeasonDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        type={type}
        onCreated={(season) =>
          setSeasons((prev) => [...prev, season])
        }
      />
    </div>
  );
}
