import { useEffect } from "react";
import { playerAPI } from "../api/player.api";
import type { IPlayer } from "../types/player";
import type { ISeason } from "../types/season";
import { seasonsAPI } from "../api/season.api";
import { seasonRegistrationApi } from "../api/seasonRegistration.api";
import type { ISeasonRegistration } from "../types/seasonRegistration";
import { dayApi } from "../api/day.api";
import type { IDay } from "../types/day";
import { trainingScoreApi } from "../api/trainingScore.api";

const body: Partial<IDay> = {
  playerId: 9,
  pointsPour: 10,
  pointsContre: 3,
};
export default function TestApi() {
  useEffect(() => {
    const test = async () => {
      const data = await trainingScoreApi.create(6, 1, body);
      console.log(data);
    };

    test();
  }, []);

  return <div>Test API</div>;
}
