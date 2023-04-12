import React, { useState } from "react";
import { SimpleGrid, Text, Box, Flex, Input } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";
import Pagination from "./Pagination";
import MovieFilter from "./MovieFilter";

interface MovieGridProps {
  selectedGenreId?: number | null;
  userId: string | null;
}

const MovieGrid = ({ selectedGenreId, userId }: MovieGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("popular");
  const [searchTerm, setSearchTerm] = useState("");
  const { movies, error, isLoading } = useMovies(
    selectedGenreId,
    currentPage,
    filter,
    searchTerm
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const skeletons = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Box paddingTop="10px" userSelect="none">
      <Flex alignItems="center" justifyContent="space-between" padding="10px">
        <Box>
          <Input
            placeholder="Search Movies"
            value={searchTerm}
            onChange={handleSearch}
            width={{ base: "60%", sm: "auto" }}
            borderColor="blue.500"
            borderRadius="full"
            focusBorderColor="blue.500"
            _placeholder={{ color: "gray.500" }}
          />
        </Box>
        <MovieFilter onFilterChange={handleFilterChange} />
      </Flex>
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
            <MovieCard movie={movie} userId={userId} />
          </MovieCardContainer>
        ))}
      </SimpleGrid>
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </Box>
  );
};

export default MovieGrid;
