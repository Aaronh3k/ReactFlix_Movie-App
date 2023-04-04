import React from "react";
import { Box, Image, Text, VStack, Badge } from "@chakra-ui/react";
import { TVShowData } from "../hooks/useTVShows";

interface TVShowCardProps {
  tvShow: TVShowData;
}

const TVShowCard: React.FC<TVShowCardProps> = ({ tvShow }) => {
  const { name, first_air_date, poster_path, vote_average, vote_count } =
    tvShow;
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <VStack spacing={2} alignItems="start">
      <Image
        src={posterBaseUrl + poster_path}
        alt={name}
        width="100%"
        borderRadius="md"
      />
      <Box>
        <Text fontWeight="bold" fontSize="lg">
          {name}
        </Text>
        <Text fontSize="sm" color="gray.500">
          First aired: {first_air_date}
        </Text>
      </Box>
      <Badge colorScheme="blue" borderRadius="full" px={2} py={1}>
        {vote_average} ({vote_count} votes)
      </Badge>
    </VStack>
  );
};

export default TVShowCard;
