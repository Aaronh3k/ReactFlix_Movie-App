import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Tag,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import useMovieDetails from "../hooks/useMovieDetails";
import apiClient from "../services/api-client";
import ScrollableImage from "../components/ScrollableImage";

export interface MovieDetails {
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: Array<{ id: number; name: string }>;
  backdrop_path: string;
}

const MovieDetailsPage = () => {
  const params = useParams<{ movieId?: string }>();
  const movieId = params.movieId ? parseInt(params.movieId) : undefined;
  const { movieDetails, error, isLoading } = useMovieDetails(movieId);
  const imageUrl = apiClient.baseImageUrl;
  const boxShadowColor = useColorModeValue("gray.400", "gray.800");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <Box>
      <ScrollableImage
        src={`${imageUrl}w1280${movieDetails?.backdrop_path}`}
        alt={movieDetails?.original_title || ""}
      />
      <Flex
        direction={{ base: "column", md: "row" }}
        mt={6}
        mx={{ base: 4, md: 16 }}
      >
        <Image
          src={`${imageUrl}w500${movieDetails?.poster_path}`}
          alt={movieDetails?.original_title}
          width={{ base: "100%", md: "30%" }}
          borderRadius="md"
          boxShadow={`0 4px 6px ${boxShadowColor}`}
          mb={{ base: 4, md: 0 }}
        />
        <VStack align="start" spacing={4} ml={{ base: 0, md: 8 }} flex="1">
          <Text fontSize="3xl" fontWeight="bold">
            {movieDetails?.original_title}
          </Text>
          <Text>Release Date: {movieDetails?.release_date}</Text>
          <Text>Runtime: {movieDetails?.runtime} minutes</Text>
          <Text>Rating: {movieDetails?.vote_average}/10</Text>
          <HStack spacing={1}>
            {movieDetails?.genres.map((genre) => (
              <Tag key={genre.id} colorScheme="red">
                {genre.name}
              </Tag>
            ))}
          </HStack>
          <Box mt={4}>
            <Text fontWeight="bold">Overview:</Text>
            <Text>{movieDetails?.overview}</Text>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default MovieDetailsPage;
