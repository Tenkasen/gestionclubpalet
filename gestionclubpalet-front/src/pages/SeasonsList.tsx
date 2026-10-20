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
            return (
              <Link key={season.id} to={`/saisons/${season.id}`}>
                <SeasonCard season={season} />
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

  function SeasonCard({ season }: { season: ISeason }) {
    const dateDebut = new Date(season.dateDebut).toLocaleDateString(
      "fr-FR",
    );
    const dateFin = season.dateFin
      ? new Date(season.dateFin).toLocaleDateString("fr-FR")
      : " ";
    const isFinished = isSeasonFinished(season.dateFin);
    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-title">{season.nom}</CardTitle>
            <Badge variant={isFinished ? "secondary" : "default"}>
              {isFinished ? "Terminée" : "En cours"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between gap-10 items-start">
            <div className="text-sm text-foreground-muted mb-4">
              <p className="mb-2">
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
            <span className="text-sm rounded-lg border border-border bg-accent font-bold italic px-3 py-1 flex items-center justify-center px-3 py-1 text-sm">
              Division 3
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-muted/40 px-3 py-1 flex items-center gap-2">
              <p className="text-2xl font-bold text-title">
                {season.registrationsCount ?? 0}
              </p>
              <p className="text-xs text-foreground-muted">joueurs</p>
            </div>

            <div className="rounded-lg border border-border bg-muted/40 px-3 py-1 flex items-center gap-2">
              <p className="text-2xl font-bold text-title">
                {season.daysCount ?? 0}
              </p>
              <p className="text-xs text-foreground-muted">
                journées
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center mt-6">
            <p>Voir en détails</p>
            <svg
              className="h-4 w-4 text-royal/80 transition-transform duration-300 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </CardContent>
      </Card>
    );
  }
}
