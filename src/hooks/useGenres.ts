import useData from "./useData";

export interface Genre {
  id: number;
  name: string;
}

interface FetchGenresResponse {
  genres: Genre[];
}

const useGenre = () => {
  const {
    data: genres,
    error,
    isLoading,
  } = useData<FetchGenresResponse, Genre>("/genre/movie/list", "genres");
  return { genres, error, isLoading };
};

export default useGenre;
