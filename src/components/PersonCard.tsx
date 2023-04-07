import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import apiClient from "../services/api-client";

interface Props {
  person: any;
}

const PersonCard = ({ person }: Props) => {
  const imageUrl = apiClient.baseImageUrl + "w342/" + person.profile_path;

  return (
    <Link to={`/person/${person.id}`}>
      <Box
        userSelect="none"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        transition="all 0.2s"
        _hover={{
          textDecoration: "none",
          boxShadow: "xl",
          transform: "scale(1.05)",
        }}
        role="group"
      >
        <Image src={imageUrl} alt={person.name} />
        <VStack p="6" spacing="1">
          <Text
            fontWeight="bold"
            fontSize="xl"
            _groupHover={{ textDecoration: "underline" }}
          >
            {person.name}
          </Text>
          <Text>Popularity: {person.popularity.toFixed(1)}</Text>
        </VStack>
      </Box>
    </Link>
  );
};

export default PersonCard;
