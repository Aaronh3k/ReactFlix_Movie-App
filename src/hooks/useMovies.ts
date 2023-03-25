import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

export interface Movie {
    id: number;
    original_title: string;
    poster_path: string;
  }
  
  interface FetchMoviesResponse {
    count: number;
    results: Movie[];
  }

const useMovies = () =>{
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const controller = new AbortController();
      apiClient
        .get<FetchMoviesResponse>("/movie/popular", {signal : controller.signal})
        .then((res) => setMovies(res.data.results))
        .catch((err) => {
            if (err instanceof CanceledError) return ;
            setError(err.message)
        })
        return () => controller.abort()
    }, []);

    return {movies, error}
}

export default useMovies