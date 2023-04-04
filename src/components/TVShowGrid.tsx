import { SimpleGrid, Text } from "@chakra-ui/react";
import useTVShows from "../hooks/useTVShows";
import TVShowCard from "./TVShowCard";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface TVShowGridProps {
  selectedGenreId?: number | null;
}

const TVShowGrid = ({ selectedGenreId }: TVShowGridProps) => {
  const { tvShows, error, isLoading } = useTVShows(selectedGenreId);
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
        {tvShows.map((tvShow) => (
          <MovieCardContainer key={tvShow.id}>
            <TVShowCard tvShow={tvShow} />
          </MovieCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default TVShowGrid;
