import { Route, Routes } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import TestApi from "./pages/TestApi";
import TrainingScoreEntry from "./pages/TrainingScoreEntry";
import DayRanking from "./pages/DayRanking";
import Error404 from "./pages/Error404";
import SeasonRanking from "./pages/SeasonRanking";
import Players from "./pages/Players.tsx";

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/players" element={<Players />} />
          <Route path="/test" element={<TestApi />} />
          <Route
            path="/seasons/:seasonId/days/:dayId/training"
            element={<TrainingScoreEntry />}
          />
          <Route
            path="/rankings/:seasonId/days/:dayId"
            element={<DayRanking />}
          />
          <Route
            path="/rankings/:seasonId"
            element={<SeasonRanking />}
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </>
  );
}
