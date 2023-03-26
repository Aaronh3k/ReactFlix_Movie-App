import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useData = <T, R>(endpoint: string, responseKey: keyof T) => {
  const [data, setData] = useState<R[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<T>(endpoint, { signal: controller.signal })
      .then((res) => {
        setData(
          res.data[responseKey as keyof typeof res.data] as unknown as R[]
        );
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, [endpoint, responseKey]);

  return { data, error, isLoading };
};

export default useData;
