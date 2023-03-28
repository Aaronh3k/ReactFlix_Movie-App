import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Tag,
  Flex,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import useMovieDetails from "../hooks/useMovieDetails";
import apiClient from "../services/api-client";
import ScrollableImage from "../components/ScrollableImage";
import useMovieCredits, { Cast } from "../hooks/useMovieCredits";
export interface MovieDetails {
  original_title: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  backdrop_path: string;
}

const MovieDetailsPage = () => {
  const params = useParams<{ movieId?: string }>();
  const movieId = params.movieId ? parseInt(params.movieId) : undefined;
  const { movieDetails, error, isLoading } = useMovieDetails(movieId);
  const {
    cast,
    error: castError,
    isLoading: castLoading,
  } = useMovieCredits(movieId);
  const imageUrl = apiClient.baseImageUrl;
  const boxShadowColor = useColorModeValue("gray.400", "gray.800");

  if (isLoading || castLoading) {
    return <Text>Loading...</Text>;
  }

  if (error || castError) {
    return <Text>Error: {error || castError}</Text>;
  }

  const renderCast = (castMembers: Cast[]) => {
    return (
      <VStack spacing={4} align="start" mt={6}>
        <Text fontSize="2xl" fontWeight="bold">
          Cast
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {castMembers.slice(0, 10).map((member) => (
            <HStack key={member.id} spacing={4}>
              {member.profile_path && (
                <Image
                  src={`${imageUrl}w92${member.profile_path}`}
                  alt={member.name}
                  borderRadius="md"
                  boxShadow={`0 4px 6px ${boxShadowColor}`}
                />
              )}
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold">{member.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  {member.character}
                </Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </VStack>
    );
  };

  return (
    <Box userSelect="none">
      <ScrollableImage
        src={`${imageUrl}w1280${movieDetails?.backdrop_path}`}
        alt={movieDetails?.original_title || ""}
      />
      <Flex
        direction={{ base: "column", md: "row" }}
        mt={6}
        mx={{ base: 4, md: 16 }}
        alignItems="start"
      >
        <Image
          src={`${imageUrl}original${movieDetails?.poster_path}`}
          alt={movieDetails?.title}
          width={{ base: "100%", md: "30%" }}
          borderRadius="md"
          boxShadow={`0 4px 6px ${boxShadowColor}`}
          mb={{ base: 4, md: 0 }}
        />

        <VStack align="start" spacing={4} ml={{ base: 0, md: 8 }} flex="1">
          <Text fontSize="3xl" fontWeight="bold">
            {movieDetails?.title}
          </Text>
          <Text>Release Date: {movieDetails?.release_date}</Text>
          <Text>Runtime: {movieDetails?.runtime} minutes</Text>
          <Text>Rating: {movieDetails?.vote_average}/10</Text>
          <Box mt={4}>
            <Text fontWeight="bold">Overview:</Text>
            <Text>{movieDetails?.overview}</Text>
          </Box>
          {cast && renderCast(cast)}
        </VStack>
      </Flex>
    </Box>
  );
};

export default MovieDetailsPage;
