import { Box, Image, Text, VStack } from "@chakra-ui/react";
import apiClient from "../services/api-client";

interface Props {
  person: any;
}

const PersonCard = ({ person }: Props) => {
  const imageUrl = apiClient.baseImageUrl + "w342/" + person.profile_path;

  return (
    <Box
      userSelect="none"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={imageUrl} alt={person.name} />
      <VStack p="6" spacing="1">
        <Text fontWeight="bold" fontSize="xl">
          {person.name}
        </Text>
        <Text>Popularity: {person.popularity.toFixed(1)}</Text>
      </VStack>
    </Box>
  );
};

export default PersonCard;
