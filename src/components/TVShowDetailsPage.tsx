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
} from "@chakra-ui/react";
import useTVShowDetails from "../hooks/useTVShowDetails";
import apiClient from "../services/api-client";
import ScrollableImage from "../components/ScrollableImage";

export interface TVShowDetails {
  original_name: string;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  episode_run_time: number[];
  vote_average: number;
  backdrop_path: string;
}

const TVShowDetailsPage = () => {
  const params = useParams<{ tvId?: string }>();
  const tvShowId = params.tvId ? parseInt(params.tvId) : undefined;
  const { tvShowDetails, error, isLoading } = useTVShowDetails(tvShowId);
  const imageUrl = apiClient.baseImageUrl;
  const boxShadowColor = useColorModeValue("gray.400", "gray.800");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

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
          <Text fontSize="3xl" fontWeight="bold">
            {tvShowDetails?.name}
          </Text>
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
          <Box mt={4}>
            <Text fontWeight="bold">Overview:</Text>
            <Text>{tvShowDetails?.overview}</Text>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default TVShowDetailsPage;
