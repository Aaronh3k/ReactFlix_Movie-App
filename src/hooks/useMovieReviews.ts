import useData from "./useData";

interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

interface Review {
  id: string;
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
}

export const useMovieReviews = (movieId: number | undefined) => {
  return useData<{ results: Review[] }, Review>(
    `/movie/${movieId}/reviews`,
    "results"
  );
};

export default useMovieReviews;
