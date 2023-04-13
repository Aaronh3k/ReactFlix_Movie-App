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

export const useTVShowReviews = (tvShowId: number | undefined) => {
  return useData<{ results: Review[] }, Review>(
    `/tv/${tvShowId}/reviews`,
    "results"
  );
};

export default useTVShowReviews;
