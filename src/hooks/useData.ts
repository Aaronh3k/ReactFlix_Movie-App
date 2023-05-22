import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

const useData = <T, R>(endpoint: string, responseKey: keyof T) => {
  const [data, setData] = useState<R[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get<T>(endpoint);
        if (res.status !== 200) {
          throw new Error(`Error: ${res.status}`);
        }
        setData(
          res.data[responseKey as keyof typeof res.data] as unknown as R[]
        );
        setLoading(false);
      } catch (err: any) {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
    
  }, [endpoint, responseKey]);

  return { data, error, isLoading };
};

export default useData;