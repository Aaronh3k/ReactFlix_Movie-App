import { useParams, Link } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  SimpleGrid,
  useColorModeValue,
  Center,
  Button,
} from "@chakra-ui/react";

import usePersonDetails from "../hooks/usePersonDetails";
import usePersonCredits from "../hooks/usePersonCredits";
import apiClient from "../services/api-client";
import DefaultProfileImage from "./DefaultProfileImage";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const PersonDetailsPage = () => {
  const { personId: personIdParam } = useParams<{ personId?: string }>();
  const personId = personIdParam ? parseInt(personIdParam) : undefined;
  const { personDetails, error, isLoading } = usePersonDetails(personId);
  const {
    movies,
    tvShows,
    error: creditsError,
    isLoading: creditsLoading,
  } = usePersonCredits(personId);
  const imageUrl = apiClient.baseImageUrl;
  const boxShadowColor = useColorModeValue("gray.400", "gray.800");

  const [showAllMovies, setShowAllMovies] = useState(false);
  const [showAllTvShows, setShowAllTvShows] = useState(false);

  if (isLoading || creditsLoading) {
    return <Text>Loading...</Text>;
  }

  if (error || creditsError) {
    return <Text>Error: {error || creditsError}</Text>;
  }

  const renderCredits = (
    title: string,
    items: any[],
    type: string,
    showAll: boolean,
    setShowAll: (state: boolean) => void
  ) => {
    const displayedItems = showAll ? items : items.slice(0, 6);

    return (
      <VStack spacing={4} align="start" mt={6} w="100%">
        <Text fontSize="2xl" fontWeight="bold">
          {title}
        </Text>
        <SimpleGrid
          columns={{ base: 2, sm: 3, md: 4, lg: 6 }}
          spacing={4}
          w="100%"
        >
          {displayedItems.map((item) => (
            <Center key={item.id}>
              <Link to={`/${type}/${item.id}`}>
                <VStack align="center" spacing={2}>
                  {item.poster_path ? (
                    <Image
                      src={`${imageUrl}w92${item.poster_path}`}
                      alt={item.title || item.name}
                      borderRadius="md"
                      boxShadow={`0 4px 6px ${boxShadowColor}`}
                    />
                  ) : (
                    <DefaultProfileImage />
                  )}
                  <Text fontWeight="bold" textAlign="center">
                    {item.title || item.name}
                  </Text>
                </VStack>
              </Link>
            </Center>
          ))}
        </SimpleGrid>
        {items.length > 5 && (
          <Center w="100%" my={4}>
            <Button size="sm" onClick={() => setShowAll(!showAll)}>
              {showAll ? (
                <>
                  Show less
                  <ChevronUpIcon ml={2} />
                </>
              ) : (
                <>
                  Show all
                  <ChevronDownIcon ml={2} />
                </>
              )}
            </Button>
          </Center>
        )}
      </VStack>
    );
  };

  return (
    <Box userSelect="none">
      <HStack
        mt={6}
        mx={{ base: 4, md: 16 }}
        spacing={6}
        alignItems="flex-start"
      >
        {personDetails?.profile_path && (
          <Image
            src={`${imageUrl}w300${personDetails.profile_path}`}
            alt={personDetails.name}
            borderRadius="md"
            boxShadow={`0 4px 6px ${boxShadowColor}`}
            mb={4}
          />
        )}
        <VStack align="start" spacing={4} flex={1}>
          <Text fontSize="3xl" fontWeight="bold">
            {personDetails?.name}
          </Text>
          <Text>Known for: {personDetails?.known_for_department}</Text>
          <Text>Birthday: {personDetails?.birthday}</Text>
          {personDetails?.deathday && (
            <Text>Deathday: {personDetails.deathday}</Text>
          )}
          <Text>
            Place of birth: {personDetails?.place_of_birth || "Unknown"}
          </Text>
          <Text>Popularity: {personDetails?.popularity}</Text>
          <Box>
            <Text fontWeight="bold">Biography:</Text>
            <Text>{personDetails?.biography}</Text>
          </Box>
          {movies &&
            renderCredits(
              "Movies:",
              movies,
              "movie",
              showAllMovies,
              setShowAllMovies
            )}
          {tvShows &&
            renderCredits(
              "TV Shows:",
              tvShows,
              "tvshow",
              showAllTvShows,
              setShowAllTvShows
            )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default PersonDetailsPage;
