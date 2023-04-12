import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useData from "../hooks/useData";
import { Dropdown } from "./Dropdown";
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Heading,
} from "@chakra-ui/react";
import apiClient from "../services/api-client";

interface TrendingItem {
  id: number;
  title: string;
  original_title?: string;
  name?: string;
  media_type: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  profile_path?: string;
}

const TrendingPage: React.FC = () => {
  const [mediaType, setMediaType] = useState("all");
  const [timeWindow, setTimeWindow] = useState("week");
  const { data, error, isLoading } = useData<
    { results: TrendingItem[] },
    TrendingItem
  >(`/trending/${mediaType}/${timeWindow}`, "results");

  const handleMediaTypeChange = (value: string) => {
    setMediaType(value);
  };

  const handleTimeWindowChange = (value: string) => {
    setTimeWindow(value);
  };

  const imageUrl = apiClient.baseImageUrl;
  const boxShadowColor = useColorModeValue("gray.400", "gray.800");
  const navigate = useNavigate();

  const handleClick = (item: TrendingItem) => {
    if (item.media_type === "movie") {
      navigate(`/movie/${item.id}`);
    } else if (item.media_type === "tv") {
      navigate(`/tvshow/${item.id}`);
    } else if (item.media_type === "person") {
      navigate(`/person/${item.id}`);
    }
  };

  return (
    <VStack spacing={6} userSelect="none">
      <Flex justify="flex-end" w="100%">
        <Dropdown
          label="Media Type"
          options={[
            { value: "all", label: "All" },
            { value: "movie", label: "Movies" },
            { value: "tv", label: "TV Shows" },
            { value: "person", label: "People" },
          ]}
          value={mediaType}
          onChange={handleMediaTypeChange}
        />
        <Dropdown
          label="Time Window"
          options={[
            { value: "day", label: "Today" },
            { value: "week", label: "This Week" },
          ]}
          value={timeWindow}
          onChange={handleTimeWindowChange}
        />
      </Flex>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={8}
        w="100%"
      >
        {data.map((item) => (
          <Box
            key={item.id}
            boxShadow={`0 4px 6px ${boxShadowColor}`}
            p={4}
            borderRadius="md"
            bg={useColorModeValue("white", "gray.700")}
            onClick={() => handleClick(item)}
            cursor="pointer"
          >
            <Image
              src={`${imageUrl}w185${item.poster_path || item.profile_path}`}
              alt={item.title || item.original_title || item.name}
              mb={4}
              borderRadius="md"
            />
            <Heading as="h2" size="md" mb={2}>
              {item.title || item.original_title || item.name}
            </Heading>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default TrendingPage;
