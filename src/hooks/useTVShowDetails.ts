import { useState, useEffect } from "react";
import { TVShowDetails } from "../components/TVShowDetailsPage";
import apiClient from "../services/api-client";

const useTVShowDetails = (tvShowId?: number) => {
  const [tvShowDetails, setTVShowDetails] = useState<TVShowDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tvShowId) return;

    const fetchTVShowDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/tv/${tvShowId}`);
        setTVShowDetails(response.data);
      } catch (err: any) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchTVShowDetails();
  }, [tvShowId]);

  return { tvShowDetails, error, isLoading };
};

export default useTVShowDetails;
