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

const usePeople = () => {
  const endpoint = "/person/popular";

  const {
    data: people,
    error,
    isLoading,
  } = useData<FetchPeopleResponse, Person>(endpoint, "results");
  return { people, error, isLoading };
};

export default usePeople;
