// In useMovieDetails.ts
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { MovieDetails } from "../components/MovieDetailsPage";

const useMovieDetails = (movieId: number | undefined) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof movieId === "undefined") {
      setError("Invalid movie ID");
      setIsLoading(false);
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        const response = await apiClient.get<MovieDetails>(`/movie/${movieId}`);
        setMovieDetails(response.data);
        setIsLoading(false);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching movie details"
        );
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return { movieDetails, error, isLoading };
};

export default useMovieDetails;
