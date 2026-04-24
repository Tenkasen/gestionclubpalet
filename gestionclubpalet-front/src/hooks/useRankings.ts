import { useState } from "react";
import type { IRanking } from "../types/ranking";

export default function useRankings(
  seasonId: number,
  dayId?: number,
) {
  const [ranking, setRanking] = useState<IRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchRanking = async(){
    try {
        setLoading(true)
        if(dayId){
            const dayRanking = await 
        }
    } catch (error) {
        
    }
  }
}
