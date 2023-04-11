import { Box, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import useTVShows from "../hooks/useTVShows";
import TVShowCard from "./TVShowCard";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";
import TVShowFilter from "./TVShowFilter";
import Pagination from "./Pagination";

interface TVShowGridProps {
  selectedGenreId?: number | null;
}

const TVShowGrid = ({ selectedGenreId }: TVShowGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("popular");
  const [searchTerm, setSearchTerm] = useState("");
  const { tvShows, error, isLoading } = useTVShows(
    selectedGenreId,
    filter,
    searchTerm,
    currentPage
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
            placeholder="Search TV shows"
            value={searchTerm}
            onChange={handleSearch}
            width={{ base: "60%", sm: "auto" }}
            borderColor="blue.500"
            borderRadius="full"
            focusBorderColor="blue.500"
            _placeholder={{ color: "gray.500" }}
          />
        </Box>
        <TVShowFilter onFilterChange={handleFilterChange} />
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
        {tvShows.map((tvShow) => (
          <MovieCardContainer key={tvShow.id}>
            <TVShowCard tvShow={tvShow} />
          </MovieCardContainer>
        ))}
      </SimpleGrid>
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </Box>
  );
};

export default TVShowGrid;
