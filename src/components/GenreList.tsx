import { Box, Divider, Heading, List, ListItem, Text } from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";

const GenreList = () => {
  const { genres, error, isLoading } = useGenres();

  if (isLoading) {
    return <Text>Loading genres...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <Box>
      <Heading as="h3" size="md" mb="4">
        Genres
      </Heading>
      <Divider mb="4" />
      <List spacing={2}>
        {genres.map((genre) => (
          <ListItem key={genre.id} fontSize="sm">
            {genre.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GenreList;
