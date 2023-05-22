// src/hooks/usePersonCredits.ts
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

type MovieCredit = {
  id: number;
  title: string;
  poster_path: string;
};

type TVShowCredit = {
  id: number;
  name: string;
  poster_path: string;
};

const usePersonCredits = (personId: number | undefined) => {
  const [movies, setMovies] = useState<MovieCredit[]>([]);
  const [tvShows, setTVShows] = useState<TVShowCredit[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!personId) return;

    const fetchCredits = async () => {
      setLoading(true);
      try {
        const movieCredits = await apiClient.get(
          `person/${personId}/movie_credits`
        );
        const tvCredits = await apiClient.get(`person/${personId}/tv_credits`);
        setMovies(movieCredits.data);
        setTVShows(tvCredits.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCredits();
  }, [personId]);

  return { movies, tvShows, error, isLoading };
};

export default usePersonCredits;
