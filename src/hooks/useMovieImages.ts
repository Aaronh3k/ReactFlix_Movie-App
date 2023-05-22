import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

export interface MovieImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

const useMovieImages = (movieId: number | undefined) => {
  const [movieImages, setMovieImages] = useState<MovieImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof movieId === "undefined") {
      setError("Invalid movie ID");
      setIsLoading(false);
      return;
    }

    const fetchMovieImages = async () => {
      try {
        const response = await apiClient.get<{ posters: MovieImage[] }>(
          `/movies/${movieId}/images`
        );
        setMovieImages(response.data.posters);
        setIsLoading(false);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching movie images"
        );
        setIsLoading(false);
      }
    };

    fetchMovieImages();
  }, [movieId]);

  return { movieImages, error, isLoading };
};

export default useMovieImages;
