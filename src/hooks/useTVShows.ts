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

const useTVShows = (
  selectedGenreId?: number | null,
  filter = "popular",
  searchTerm = "",
  currentPage = 1
) => {
  const [endpoint, setEndpoint] = useState<string>(`/tv/${filter}`);

  useEffect(() => {
    let endpointString = `/tv/${filter}?page=${currentPage}`;

    if (selectedGenreId) {
      endpointString += `&with_genres=${selectedGenreId}`;
    }

    if (searchTerm) {
      endpointString = `/tv/search?query=${encodeURIComponent(
        searchTerm
      )}&page=${currentPage}`;
    }

    setEndpoint(endpointString);
  }, [selectedGenreId, filter, searchTerm, currentPage]);

  const {
    data: tvShows,
    error,
    isLoading,
  } = useData<{ results: TVShowData[] }, TVShowData>(endpoint, "results");

  return { tvShows, error, isLoading };
};

export default useTVShows;
