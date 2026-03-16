import { useEffect } from "react";
import { playerAPI } from "../api/player.api";
import type { IPlayer } from "../types/player";
import type { ISeason } from "../types/season";
import { seasonsAPI } from "../api/season.api";
import { seasonRegistrationApi } from "../api/seasonRegistration.api";
import type { ISeasonRegistration } from "../types/seasonRegistration";

const body: Partial<ISeasonRegistration> = {
  playerId: 6,
};
export default function TestApi() {
  useEffect(() => {
    const test = async () => {
      const data = await seasonRegistrationApi.delete(2, 5);
      console.log(data);
    };

    test();
  }, []);

  return <div>Test API</div>;
}
