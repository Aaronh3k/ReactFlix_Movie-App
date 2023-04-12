import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const useFavorites = (userId: string | null) => {
  const [favorites, setFavorites] = useState<Array<number>>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchUserFavorites = async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("item_id")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching user favorites:", error.message);
      } else {
        setFavorites(data.map((favorite) => favorite.item_id));
      }
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
