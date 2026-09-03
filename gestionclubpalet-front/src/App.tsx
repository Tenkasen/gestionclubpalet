import { Route, Routes } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import TestApi from "./pages/TestApi";
import TrainingScoreEntry from "./pages/TrainingScoreEntry";
import DayRanking from "./pages/DayRanking";
import Error404 from "./pages/Error404";
import SeasonRanking from "./pages/SeasonRanking";
import Players from "./pages/Players.tsx";
import { Toaster } from "sonner";
import ChampionshipScoreEntry from "./pages/ChampionshipScoreEntry.tsx";
import TrainingSeasons from "./pages/TrainingSeasons.tsx";
import ChampionshipSeasons from "./pages/ChampionshipSeasons.tsx";
import CupSeasons from "./pages/CupSeasons.tsx";
import SeasonDetail from "./pages/SeasonDetail.tsx";

export default function App() {
  return (
    <>
      <div className="min-h-screen app-background">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/joueurs" element={<Players />} />
          <Route path="/test" element={<TestApi />} />
          <Route path="/entrainement" element={<TrainingSeasons />} />
          <Route
            path="/championnat"
            element={<ChampionshipSeasons />}
          />
          <Route path="/coupe" element={<CupSeasons />} />
          <Route
            path="/saisons/:seasonId"
            element={<SeasonDetail />}
          />
          <Route
            path="/saisons/:seasonId/journées/:dayIndex/saisie-entrainement"
            element={<TrainingScoreEntry />}
          />
          <Route
            path="/saisons/:seasonId/journées/:dayIndex/saisie-match"
            element={<ChampionshipScoreEntry />}
          />
          <Route
            path="/classements/:seasonId/journées/:dayIndex"
            element={<DayRanking />}
          />
          <Route
            path="/classements/:seasonId"
            element={<SeasonRanking />}
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Toaster
          position="top-right"
          offset="70px"
          toastOptions={{
            classNames: {
              success: "!bg-green-700 !text-white !text-lg",
              error: "!bg-red-600 !text-white !text-sm !max-w-75",
            },
          }}
        />
      </div>
    </>
  );
}
