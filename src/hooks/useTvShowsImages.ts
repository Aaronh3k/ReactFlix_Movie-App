import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

export interface TvShowImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

const useTvShowImages = (tvshowId: number | undefined) => {
  const [tvShowImages, setTvShowImages] = useState<TvShowImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof tvshowId === "undefined") {
      setError("Invalid tv show ID");
      setIsLoading(false);
      return;
    }

    const fetchTvShowImages = async () => {
      try {
        const response = await apiClient.get<{ posters: TvShowImage[] }>(
          `/tv/${tvshowId}/images`
        );
        setTvShowImages(response.data.posters);
        setIsLoading(false);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching tv show images"
        );
        setIsLoading(false);
      }
    };

    fetchTvShowImages();
  }, [tvshowId]);

  return { tvShowImages, error, isLoading };
};

export default useTvShowImages;
