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
        const { data } = await apiClient.get<Movie>(`/movie/${movieId}`);
        moviesData.push(data);
      }

      setFavoriteMovies(moviesData);
    };

    fetchFavoriteMovies();
  }, [favorites]);

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
      spacing={10}
      padding="10px"
    >
      {favoriteMovies.map((movie) => (
        <MovieCardContainer key={movie.id}>
          <MovieCard movie={movie} userId={userId} />
        </MovieCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default FavoritesGrid;
