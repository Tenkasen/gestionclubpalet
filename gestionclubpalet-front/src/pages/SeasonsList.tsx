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
import Header from "../components/layout/Header.tsx";

const TYPE_LABELS: Record<ISeason["type"], string> = {
  ENTRAINEMENT: "Entraînement",
  CHAMPIONNAT: "Championnat",
  COUPE: "Coupe",
};

interface Props {
  type: ISeason["type"];
}

function isSeasonFinished(date: string | null): boolean {
  if (!date) return false;
  return new Date().getTime() > new Date(date).getTime();
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
    <>
      <Header />
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

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {seasons.map((season) => {
            const isFinished = isSeasonFinished(season.dateFin);
            const dateDebut = new Date(
              season.dateDebut,
            ).toLocaleDateString("fr-FR");
            const dateFin = season.dateFin
              ? new Date(season.dateFin).toLocaleDateString("fr-FR")
              : "En cours";
            return (
              <Link key={season.id} to={`/saisons/${season.id}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-title">
                        {season.nom}
                      </CardTitle>
                      <Badge variant="secondary">{season.type}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    <div className="text-sm text-foreground-muted">
                      <p>
                        <span className="font-semibold text-foreground">
                          Début :
                        </span>{" "}
                        {dateDebut}
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">
                          Fin :
                        </span>{" "}
                        {dateFin}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border bg-muted/40 p-3">
                        <p className="text-2xl font-bold text-title">
                          {season.registrationsCount ?? 0}
                        </p>
                        <p className="text-xs text-foreground-muted">
                          joueurs
                        </p>
                      </div>

                      <div className="rounded-lg border bg-muted/40 p-3">
                        <p className="text-2xl font-bold text-title">
                          {season.daysCount ?? 0}
                        </p>
                        <p className="text-xs text-foreground-muted">
                          journées
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Link to={`/saison/${season.id}`}>
                        Voir détails
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
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
    </>
  );
}
