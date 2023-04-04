import { Box, Card, CardBody, HStack, Image, Text } from "@chakra-ui/react";
import apiClient from "../services/api-client";
import { TVShowData } from "../hooks/useTVShows";
import VoteAverage from "./VoteAverage";
import { Link } from "react-router-dom";

interface Props {
  tvShow: TVShowData;
}

const TVShowCard = ({ tvShow }: Props) => {
  const imageUrl = apiClient.baseImageUrl + "w342/" + tvShow.poster_path;

  return (
    <Card userSelect="none">
      <Link to={`/tvshow/${tvShow.id}`}>
        <Box position="relative">
          <Image src={imageUrl} alt={tvShow.original_name} />
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
              {tvShow.overview}
            </Text>
          </Box>
        </Box>
      </Link>
      <CardBody>
        <HStack justifyContent="space-between">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {tvShow.name}
          </Box>
          <VoteAverage score={tvShow.vote_average} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default TVShowCard;
