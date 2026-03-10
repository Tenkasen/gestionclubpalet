import { useEffect } from "react";
import { playerAPI } from "../api/player.api";
import type { IPlayer } from "../types/player";
import type { ISeason } from "../types/season";
import { seasonsAPI } from "../api/season.api";

const body: Partial<IPlayer> = {
  nom: "BOURDET",
  prenom: "test",
};
export default function TestApi() {
  useEffect(() => {
    const test = async () => {
      const data = await playerAPI.delete(19);
      console.log(data);
    };

    test();
  }, []);

  return <div>Test API</div>;
}
