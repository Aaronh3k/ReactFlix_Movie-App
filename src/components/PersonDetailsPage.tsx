import { useParams } from "react-router-dom";
import { Box, Text, Image, VStack, useColorModeValue } from "@chakra-ui/react";
import usePersonDetails, { PersonDetails } from "../hooks/usePersonDetails";
import apiClient from "../services/api-client";

const PersonDetailsPage = () => {
  const params = useParams<{ personId?: string }>();
  const personId = params.personId ? parseInt(params.personId) : undefined;
  const { personDetails, error, isLoading } = usePersonDetails(personId);
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
      <VStack align="start" spacing={4} mt={6} mx={{ base: 4, md: 16 }}>
        {personDetails?.profile_path && (
          <Image
            src={`${imageUrl}w300${personDetails.profile_path}`}
            alt={personDetails.name}
            borderRadius="md"
            boxShadow={`0 4px 6px ${boxShadowColor}`}
            mb={4}
          />
        )}
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
        <Box mt={4}>
          <Text fontWeight="bold">Biography:</Text>
          <Text>{personDetails?.biography}</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default PersonDetailsPage;
