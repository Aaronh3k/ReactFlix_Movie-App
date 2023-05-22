import { useEffect, useState } from "react";
import useData from "./useData";

export interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for: any[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
}

interface FetchPeopleResponse {
  page: number;
  results: Person[];
}

const usePeople = (filter = "popular", searchTerm = "", currentPage = 1) => {
  const [endpoint, setEndpoint] = useState<string>(`/person/${filter}`);

  useEffect(() => {
    let endpointString = `/person/${filter}?page=${currentPage}`;

    if (searchTerm) {
      endpointString = `/person/search?query=${encodeURIComponent(
        searchTerm
      )}&page=${currentPage}`;
    }

    setEndpoint(endpointString);
  }, [filter, searchTerm, currentPage]);

  const {
    data: people,
    error,
    isLoading,
  } = useData<{ results: Person[] }, Person>(endpoint, "results");

  return { people, error, isLoading };
};

export default usePeople;
