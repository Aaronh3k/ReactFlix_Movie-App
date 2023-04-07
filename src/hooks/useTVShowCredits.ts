import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

const useTVShowCredits = (tvId: number | undefined) => {
  const [cast, setCast] = useState<Cast[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof tvId === "undefined") {
      setError("Invalid TV show ID");
      setIsLoading(false);
      return;
    }

    const fetchTVShowCredits = async () => {
      try {
        const response = await apiClient.get<{ cast: Cast[] }>(
          `/tv/${tvId}/credits`
        );
        setCast(response.data.cast);
        setIsLoading(false);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching TV show credits"
        );
        setIsLoading(false);
      }
    };

    fetchTVShowCredits();
  }, [tvId]);

  return { cast, error, isLoading };
};

export default useTVShowCredits;
