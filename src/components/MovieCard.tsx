import { Box, Card, CardBody, HStack, Image, Text } from "@chakra-ui/react";
import apiClient from "../services/api-client";
import { Movie } from "../hooks/useMovies";
import VoteAverage from "./VoteAverage";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const imageUrl = apiClient.baseImageUrl + "w342/" + movie.poster_path;

  return (
    <Card
      width="300px"
      maxW="sm"
      borderRadius={10}
      boxShadow="md"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.1)", boxShadow: "xl" }}
    >
      <Box position="relative">
        <Image src={imageUrl} alt={movie.original_title} />
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="rgba(0, 0, 0, 0.7)"
          opacity="0"
          transition="all 0.3s"
          _hover={{ opacity: "1" }}
        >
          <Text color="white" textAlign="center">
            {movie.overview}
          </Text>
        </Box>
      </Box>
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
