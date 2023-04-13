import { useParams, Link } from "react-router-dom";
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
  Center,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import useTVShowDetails from "../hooks/useTVShowDetails";
import apiClient from "../services/api-client";
import ScrollableImage from "../components/ScrollableImage";
import useTVShowCredits, { Cast } from "../hooks/useTVShowCredits";
import DefaultProfileImage from "./DefaultProfileImage";
import useTVShowReviews from "../hooks/useTVShowReviews";
import ReviewSlider from "./ReviewSlider";

export interface TVShowDetails {
  original_name: string;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  episode_run_time: number[];
  vote_average: number;
  backdrop_path: string;
  genres: Array<{ id: number; name: string }>;
}

const TVShowDetailsPage = () => {
  const params = useParams<{ tvId?: string }>();
  const tvShowId = params.tvId ? parseInt(params.tvId) : undefined;
  const { tvShowDetails, error, isLoading } = useTVShowDetails(tvShowId);
  const imageUrl = apiClient.baseImageUrl;
  const boxShadowColor = useColorModeValue("gray.400", "gray.800");
  const {
    cast,
    error: castError,
    isLoading: castLoading,
  } = useTVShowCredits(tvShowId);
  const {
    data: reviews,
    error: reviewsError,
    isLoading: reviewsLoading,
  } = useTVShowReviews(tvShowId);

  if (isLoading || castLoading || reviewsLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (error || castError || reviewsError) {
    return <Text>Error: {error || castError || reviewsError}</Text>;
  }

  const renderCast = (castMembers: Cast[]) => {
    return (
      <VStack spacing={4} align="start" mt={6} w="100%">
        <Text fontSize="2xl" fontWeight="bold">
          Cast
        </Text>
        <SimpleGrid
          columns={{ base: 2, sm: 3, md: 4, lg: 6 }}
          spacing={4}
          w="100%"
        >
          {castMembers.slice(0, 12).map((member) => (
            <Center key={member.id}>
              <Link to={`/person/${member.id}`}>
                <VStack align="center" spacing={2}>
                  {member.profile_path ? (
                    <Image
                      src={`${imageUrl}w92${member.profile_path}`}
                      alt={member.name}
                      borderRadius="md"
                      boxShadow={`0 4px 6px ${boxShadowColor}`}
                    />
                  ) : (
                    <DefaultProfileImage />
                  )}
                  <Text fontWeight="bold" textAlign="center">
                    {member.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    {member.character}
                  </Text>
                </VStack>
              </Link>
            </Center>
          ))}
        </SimpleGrid>
      </VStack>
    );
  };

  return (
    <Box userSelect="none">
      <ScrollableImage
        src={`${imageUrl}w1280${tvShowDetails?.backdrop_path}`}
        alt={tvShowDetails?.original_name || ""}
      />
      <Flex
        direction={{ base: "column", md: "row" }}
        mt={6}
        mx={{ base: 4, md: 16 }}
        alignItems="start"
      >
        <Image
          src={`${imageUrl}original${tvShowDetails?.poster_path}`}
          alt={tvShowDetails?.name}
          width={{ base: "100%", md: "30%" }}
          borderRadius="md"
          boxShadow={`0 4px 6px ${boxShadowColor}`}
          mb={{ base: 4, md: 0 }}
        />
        <VStack align="start" spacing={4} ml={{ base: 0, md: 8 }} flex="1">
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            <Text fontSize="4xl" fontWeight="bold" ml={2}>
              {tvShowDetails?.name}
            </Text>
            {tvShowId && <ReviewSlider mediaId={tvShowId} mediaType="tv" />}
          </Flex>
          <Text fontSize="md" fontStyle="italic">
            {tvShowDetails?.original_name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            First air date: {tvShowDetails?.first_air_date}
          </Text>
          <HStack spacing={2} mt={2}>
            {tvShowDetails?.episode_run_time.map((runtime, index) => (
              <Tag key={index} colorScheme="blue" borderRadius="full">
                {runtime} min
              </Tag>
            ))}
          </HStack>
          <Text fontSize="lg" fontWeight="bold" mt={2}>
            Rating: {tvShowDetails?.vote_average}
          </Text>
          <HStack spacing={2}>
            {tvShowDetails?.genres.map((genre) => (
              <Badge
                key={genre.id}
                borderRadius="full"
                px={3}
                py={1}
                bg="green.500"
                color="white"
                fontWeight="bold"
                fontSize="sm"
              >
                {genre.name}
              </Badge>
            ))}
          </HStack>
          <Box mt={4}>
            <Text fontWeight="bold">Overview:</Text>
            <Text>{tvShowDetails?.overview}</Text>
          </Box>
          {cast && renderCast(cast)}
        </VStack>
      </Flex>
    </Box>
  );
};

export default TVShowDetailsPage;
