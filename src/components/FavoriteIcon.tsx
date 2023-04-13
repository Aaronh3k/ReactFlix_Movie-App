import React, { useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { MdFavorite } from "react-icons/md";
import { supabase } from "../supabaseClient";
import useFavorites from "../hooks/useFavourite";

interface FavoriteIconProps {
  userId: string;
  itemId: number;
  itemType: string;
  onFavoriteRemoved: (movieId: number) => void;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({
  userId,
  itemId,
  itemType,
  onFavoriteRemoved,
}) => {
  const { favorites, setFavorites, isFavorite } = useFavorites(userId);
  const [isFav, setIsFav] = React.useState(false);

  useEffect(() => {
    setIsFav(isFavorite(itemId));
  }, [favorites, isFavorite, itemId]);

  const handleClick = async () => {
    setIsFav(!isFav);

    if (!isFav) {
      const { error } = await supabase
        .from("favorites")
        .insert([{ user_id: userId, item_id: itemId, item_type: itemType }]);
      if (error) {
        console.error("Error adding favorite:", error);
      } else {
        setFavorites((prevFavorites: Array<number>) => [
          ...prevFavorites,
          itemId,
        ]);
      }
    } else {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .match({ user_id: userId, item_id: itemId, item_type: itemType });
      if (error) {
        console.error("Error removing favorite:", error);
      } else {
        setFavorites((prevFavorites: Array<number>) =>
          prevFavorites.filter((favorite: number) => favorite !== itemId)
        );
        onFavoriteRemoved(itemId);
      }
    }
  };

  return (
    <IconButton
      aria-label="Favorite"
      icon={<MdFavorite size="2em" />}
      colorScheme={isFav ? "red" : "gray"}
      variant="outline"
      onClick={handleClick}
      position="absolute"
      top="0"
      right="0"
      zIndex="1"
      transform="translate(20%, -20%)"
      borderRadius="50%"
      size="lg"
      transition="transform 0.2s ease-in-out"
      _active={{
        transform: "scale(1.2)",
      }}
    />
  );
};

export default FavoriteIcon;
