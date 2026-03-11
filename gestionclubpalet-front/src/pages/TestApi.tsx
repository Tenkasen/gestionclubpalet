import { useEffect } from "react";
import { playerAPI } from "../api/player.api";
import type { IPlayer } from "../types/player";
import type { ISeason } from "../types/season";
import { seasonsAPI } from "../api/season.api";
import { seasonRegistrationApi } from "../api/seasonRegistration.api";

const body: Partial<IPlayer> = {
  nom: "BOURDET",
  prenom: "test",
};
export default function TestApi() {
  useEffect(() => {
    const test = async () => {
      const data = await seasonRegistrationApi.getAll(555);
      console.log(data);
    };

    test();
  }, []);

  return <div>Test API</div>;
}
