import { Box, Card, CardBody, HStack, Image, Text } from "@chakra-ui/react";
import { Movie } from "../hooks/useMovies";
import VoteAverage from "./VoteAverage";

interface props {
  movie: Movie;
}

const MovieCard = ({ movie }: props) => {
  const imageUrl = "https://image.tmdb.org/t/p/w342/" + movie.poster_path;

  return (
    <Card
      maxW="sm"
      borderRadius={10}
      boxShadow="md"
      overflow="hidden"
      _hover={{ boxShadow: "lg" }}
    >
      <Image src={imageUrl} alt={movie.original_title} />
      <CardBody>
        <HStack justifyContent="space-between">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {movie.original_title}
          </Box>
          <VoteAverage score={movie.vote_average} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
