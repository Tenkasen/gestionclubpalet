import { useEffect } from "react";
import { seasonsAPI } from "../api/season.api";

export default function TestApi() {
  useEffect(() => {
    const test = async () => {
      const data = await seasonsAPI.getOne(1);
      console.log("Season:", data);
    };

    test();
  }, []);

  return <div>Test API</div>;
}
