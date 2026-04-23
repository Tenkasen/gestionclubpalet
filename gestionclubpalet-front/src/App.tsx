import { Route, Routes } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import TestApi from "./pages/TestApi";
import TrainingScoreEntry from "./pages/TrainingScoreEntry";
import RankingTables from "./components/rankings/RankingTables";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/test" element={<TestApi />} />
        <Route
          path="/seasons/:seasonId/days/:dayId/training"
          element={<TrainingScoreEntry />}
        />
        <Route path="/ranking" element={<RankingTables />} />
      </Routes>
    </div>
  );
}
