import useData from "./useData";

export interface Movie {
  id: number;
  original_title: string;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
}

interface FetchMoviesResponse {
  count: number;
  results: Movie[];
}

const useMovies = (selectedGenreId?: number | null, page?: number) => {
  const endpoint = selectedGenreId
    ? `/discover/movie?with_genres=${selectedGenreId}&page=${page || 1}`
    : `/movie/popular?page=${page || 1}`;

  const {
    data: movies,
    error,
    isLoading,
  } = useData<FetchMoviesResponse, Movie>(endpoint, "results");
  return { movies, error, isLoading };
};

export default useMovies;
