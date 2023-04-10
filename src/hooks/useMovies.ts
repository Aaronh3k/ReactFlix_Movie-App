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

const useMovies = (
  selectedGenreId?: number | null,
  page?: number,
  filter?: string
) => {
  let endpoint;

  if (selectedGenreId) {
    endpoint = `/discover/movie?with_genres=${selectedGenreId}&page=${
      page || 1
    }`;
  } else {
    endpoint = `/movie/${filter}?page=${page || 1}`;
  }

  const {
    data: movies,
    error,
    isLoading,
  } = useData<FetchMoviesResponse, Movie>(endpoint, "results");

  return { movies, error, isLoading };
};

export default useMovies;
