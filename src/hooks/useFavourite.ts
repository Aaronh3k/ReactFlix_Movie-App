import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

const useFavorites = (userId: string | null) => {
  const [favorites, setFavorites] = useState<Array<number>>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchUserFavorites = async () => {
      const { data } = await apiClient.get(`/accounts/${userId}/favourites`);

      setFavorites(data);
    };

    fetchUserFavorites();
  }, [userId]);

  const isFavorite = (itemId: number) => {
    return favorites.includes(itemId);
  };

  return {
    favorites,
    setFavorites,
    isFavorite,
  };
};

export default useFavorites;