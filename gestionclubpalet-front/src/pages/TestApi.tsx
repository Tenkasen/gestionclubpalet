import { useEffect } from "react";
import { playerAPI } from "../api/player.api";
import type { IPlayer } from "../types/player";
import type { ISeason } from "../types/season";
import { seasonsAPI } from "../api/season.api";
import { seasonRegistrationApi } from "../api/seasonRegistration.api";
import type { ISeasonRegistration } from "../types/seasonRegistration";
import { dayApi } from "../api/day.api";
import type { IDay } from "../types/day";

const body: Partial<IDay> = {
  date: "29-11-2024",
};
export default function TestApi() {
  useEffect(() => {
    const test = async () => {
      const data = await dayApi.create(6, body);
      console.log(data);
    };

    test();
  }, []);

  return <div>Test API</div>;
}
