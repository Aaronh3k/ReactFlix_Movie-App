import { useState, useEffect } from "react";
import useData from "./useData";

export interface TVShowData {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

const useTVShows = (selectedGenreId?: number | null) => {
  const [endpoint, setEndpoint] = useState<string>("/tv/popular");

  useEffect(() => {
    if (selectedGenreId) {
      setEndpoint(`/tv/popular?with_genres=${selectedGenreId}`);
    } else {
      setEndpoint("/tv/popular");
    }
  }, [selectedGenreId]);

  const {
    data: tvShows,
    error,
    isLoading,
  } = useData<{ results: TVShowData[] }, TVShowData>(endpoint, "results");

  return { tvShows, error, isLoading };
};

export default useTVShows;
