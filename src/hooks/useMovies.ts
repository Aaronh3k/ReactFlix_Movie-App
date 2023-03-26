import useData from "./useData";

export interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
}

interface FetchMoviesResponse {
  count: number;
  results: Movie[];
}

const useMovies = () => {
  const {
    data: movies,
    error,
    isLoading,
  } = useData<FetchMoviesResponse, Movie>("/movie/popular", "results");
  return { movies, error, isLoading };
};

export default useMovies;
