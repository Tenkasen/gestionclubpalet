import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { seasonsAPI } from "../api/season.api";
import { dayApi } from "../api/day.api";
import type { ISeason } from "../types/season";
import type { IDay } from "../types/day";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Button from "../components/ui/Button.tsx";
import CreateDayDialog from "../components/days/CreateDayDialog";
import PageLoading from "../components/feedback/PageLoading.tsx";
import PageError from "../components/feedback/PageError.tsx";
import Header from "../components/layout/Header.tsx";

const SCORE_ENTRY_ROUTE: Record<
  string,
  (seasonId: number, dayIndex: number) => string
> = {
  ENTRAINEMENT: (s, d) =>
    `/saisons/${s}/journées/${d}/saisie-entrainement`,
  CHAMPIONNAT: (s, d) => `/saisons/${s}/journées/${d}/saisie-match`,
  COUPE: (s, d) => `/saisons/${s}/journées/${d}/saisie-match`,
};

export default function SeasonDetail() {
  const { seasonId } = useParams();
  const seasonIdNumber = Number(seasonId);
  const navigate = useNavigate();

  const [season, setSeason] = useState<ISeason | null>(null);
  const [days, setDays] = useState<IDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateDayDialog, setShowCreateDayDialog] =
    useState(false);

  async function loadData() {
    try {
      const seasonData = await seasonsAPI.getOne(seasonIdNumber);
      if (!seasonData) {
        setError("Cette saison n'existe pas");
        return;
      }
      const daysData = await dayApi.getAll(seasonIdNumber);
      setSeason(seasonData);
      setDays(daysData ?? []);
    } catch (err) {
      setError("Erreur lors du chargement de la saison");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [seasonIdNumber]);

  if (loading) return <PageLoading />;
  if (error || !season)
    return <PageError error={error ?? "Saison introuvable"} />;

  const sortedDays = [...days].sort(
    (a, b) => a.indexJour - b.indexJour,
  );
  const scoreEntryFor =
    SCORE_ENTRY_ROUTE[season.type] ?? SCORE_ENTRY_ROUTE.ENTRAINEMENT;
  console.log(days);

  return (
    <>
      <Header />
      <div className="container mx-auto py-10 max-w-4xl space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl text-title font-bold">
              {season.nom}
            </h1>
            <p className="text-foreground-subtle mt-1">
              Du{" "}
              {new Date(season.dateDebut).toLocaleDateString("fr-FR")}
              {season.dateFin
                ? ` au ${new Date(season.dateFin).toLocaleDateString("fr-FR")}`
                : ""}
            </p>
          </div>
          <Button
            variant="confirm"
            onClick={() => navigate(`/classements/${season.id}`)}
          >
            Classement de la saison
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Joueurs inscrits ({season.registrations?.length ?? 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {season.registrationsCount === 0 ? (
              <p className="text-foreground-subtle">
                Aucun joueur inscrit.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {season.registrations?.map((reg) => (
                  <Badge key={reg.id} variant="secondary">
                    {reg.player.prenom} {reg.player.nom}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-title">
              Journées ({sortedDays.length})
            </h2>
            <Button
              variant="confirm"
              onClick={() => setShowCreateDayDialog(true)}
            >
              Créer une journée
            </Button>
          </div>

          {sortedDays.length === 0 ? (
            <p className="text-foreground-subtle">
              Aucune journée pour l'instant.
            </p>
          ) : (
            <div className="space-y-2 grid grid-cols-3 gap-4">
              {sortedDays.map((day) => (
                <Card key={day.id} className="max-w-sm">
                  <CardContent className="flex justify-between items-center py-2">
                    <p className="font-semibold text-base">
                      Journée {day.indexJour} —{" "}
                      {new Date(day.date).toLocaleDateString("fr-FR")}
                    </p>
                    <p className="italic">{} joueurs</p>
                  </CardContent>
                  <div className="flex justify-between px-4">
                    <Button
                      variant="confirm"
                      onClick={() =>
                        navigate(
                          scoreEntryFor(season.id, day.indexJour),
                        )
                      }
                    >
                      Saisie des scores
                    </Button>
                    <Button variant="export">
                      Classement de la journée
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <CreateDayDialog
          open={showCreateDayDialog}
          onOpenChange={setShowCreateDayDialog}
          seasonId={season.id}
          onCreated={(day) => setDays((prev) => [...prev, day])}
        />
      </div>
    </>
  );
}
