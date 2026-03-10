import { useEffect } from "react";
import { seasonsAPI } from "../api/season.api";
import type { ISeason } from "../types/season";

const body: Partial<ISeason> = {
  nom: "Entraînement 2020",
  type: "ENTRAINEMENT",
  dateDebut: "2024-09-01",
};
export default function TestApi() {
  useEffect(() => {
    const test = async () => {
      const data = await seasonsAPI.create(body);
      console.log("Season:", data);
    };

    test();
  }, []);

  return <div>Test API</div>;
}
