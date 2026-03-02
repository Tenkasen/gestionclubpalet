import { useEffect, useState } from "react";

import { seasonsAPI } from "../api/season.api";
import type { ISeason } from "../types";



export default function useSeasons(type?:string) {

    const [seasons, setSeasons] = useState<ISeason[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchSeasons = () => {
        try {
            setLoading(true)
            const response = await seasonsAPI.getAll(type)
            setSeasons(response)
            setError(null)
        } catch (error) {
            setError('Erreur lors du chargement des saisons')
            console.error(error)
        }finally{
            setLoading(false)
        }

         useEffect (() =>{
            fetchSeasons()
        },[type])

        return {seasons, loading, error, refetch : fetchSeasons}
    }
    
  return (
    <div>useSeasons</div>
  )
}
