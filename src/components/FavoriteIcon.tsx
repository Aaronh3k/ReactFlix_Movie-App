import React, { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { MdFavorite } from "react-icons/md";
import apiClient from "../services/api-client";

interface FavoriteIconProps {
  userId: string;
  movieId: number;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({ userId, movieId }) => {
  const [isFav, setIsFav] = useState<boolean>(false);

  const handleClick = async () => {
    setIsFav(!isFav);
  
    if (!isFav) {
      await apiClient.post(`/accounts/${userId}/favourites`, { movieId });
    } else {
      await apiClient.delete(`/accounts/${userId}/favourites`, { data: { movieId } });
    }
  };  

  useEffect(() => {
    const checkFavorite = async () => {
      const { data } = await apiClient.get(`/accounts/${userId}/favourites`);
      setIsFav(data.includes(movieId));
    };
    checkFavorite();
  }, [userId, movieId]);

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