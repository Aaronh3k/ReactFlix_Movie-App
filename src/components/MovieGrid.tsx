import { SimpleGrid, Text, Box } from "@chakra-ui/react";
import { useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";
import Pagination from "./Pagination";
import MovieFilter from "./MovieFilter";

interface MovieGridProps {
  selectedGenreId?: number | null;
}

const MovieGrid = ({ selectedGenreId }: MovieGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("popular");
  const { movies, error, isLoading } = useMovies(
    selectedGenreId,
    currentPage,
    filter
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const skeletons = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Box paddingTop="60px">
      <MovieFilter onFilterChange={handleFilterChange} />
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
    </Box>
  );
};

export default MovieGrid;
