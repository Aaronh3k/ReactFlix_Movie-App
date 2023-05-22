// hooks/useMovieCredits.ts
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

const useMovieCredits = (movieId: number | undefined) => {
  const [cast, setCast] = useState<Cast[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof movieId === "undefined") {
      setError("Invalid movie ID");
      setIsLoading(false);
      return;
    }

    const fetchMovieCredits = async () => {
      try {
        const response = await apiClient.get<{ cast: Cast[] }>(
          `/movies/${movieId}/credits`
        );
        setCast(response.data.cast);
        setIsLoading(false);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching movie credits"
        );
        setIsLoading(false);
      }
    };

    fetchMovieCredits();
  }, [movieId]);

  return { cast, error, isLoading };
};

export default useMovieCredits;
