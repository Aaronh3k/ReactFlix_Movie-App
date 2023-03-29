import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

export interface PersonDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
}

const usePersonDetails = (personId?: number) => {
  const [personDetails, setPersonDetails] = useState<PersonDetails | null>(
    null
  );
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!personId) return;

    const fetchPersonDetails = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<PersonDetails>(
          `/person/${personId}`
        );
        setPersonDetails(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPersonDetails();
  }, [personId]);

  return { personDetails, error, isLoading };
};

export default usePersonDetails;
