import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import MovieCardContainer from "./MovieCardContainer";
import { Movie } from "../hooks/useMovies";
import useFavorites from "../hooks/useFavourite";
import apiClient from "../services/api-client";

interface FavoritesGridProps {
  userId: string | null;
}

const FavoritesGrid: React.FC<FavoritesGridProps> = ({ userId }) => {
  const { favorites } = useFavorites(userId);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const moviesData: Movie[] = [];

      for (const movieId of favorites) {
        const { data } = await apiClient.get<Movie>(`/movies/${movieId}`);
        moviesData.push(data);
      }

      setFavoriteMovies(moviesData);
    };

    fetchFavoriteMovies();
  }, [favorites]);

  const onFavoriteRemoved = (movieId: number) => {
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId)
    );
  };

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
      spacing={10}
      padding="10px"
    >
      {favoriteMovies.map((movie) => (
        <MovieCardContainer key={movie.id}>
          <MovieCard
            movie={movie}
            userId={userId}
            onFavoriteRemoved={onFavoriteRemoved}
          />
        </MovieCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default FavoritesGrid;
