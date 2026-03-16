import { useEffect } from "react";
import { playerAPI } from "../api/player.api";
import type { IPlayer } from "../types/player";
import type { ISeason } from "../types/season";
import { seasonsAPI } from "../api/season.api";
import { seasonRegistrationApi } from "../api/seasonRegistration.api";
import type { ISeasonRegistration } from "../types/seasonRegistration";
import { dayApi } from "../api/day.api";

const body: Partial<ISeasonRegistration> = {
  playerId: 6,
};
export default function TestApi() {
  useEffect(() => {
    const test = async () => {
      const data = await dayApi.getAll(3);
      console.log(data);
    };

    test();
  }, []);

  return <div>Test API</div>;
}
