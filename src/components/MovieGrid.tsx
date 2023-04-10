import { SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";
import Pagination from "./Pagination";

interface MovieGridProps {
  selectedGenreId?: number | null;
}

const MovieGrid = ({ selectedGenreId }: MovieGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { movies, error, isLoading } = useMovies(selectedGenreId, currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const skeletons = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        spacing={10}
        padding="10px"
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <MovieCardContainer key={skeleton}>
              <MovieCardSkeleton />
            </MovieCardContainer>
          ))}
        {movies.map((movie) => (
          <MovieCardContainer key={movie.id}>
            <MovieCard movie={movie} />
          </MovieCardContainer>
        ))}
      </SimpleGrid>
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
};

export default MovieGrid;
