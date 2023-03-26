import {
  Box,
  Divider,
  Heading,
  List,
  ListItem,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";

const GenreList = () => {
  const { genres, error, isLoading } = useGenres();
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.700" };
  const borderColor = { light: "gray.200", dark: "gray.600" };
  const hoverColor = { light: "gray.200", dark: "gray.500" };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return null;
  }

  return (
    <Box
      boxShadow="md"
      borderWidth="1px"
      borderRadius="md"
      borderColor={borderColor[colorMode]}
      p="4"
      bgColor={bgColor[colorMode]}
    >
      <Divider mb="4" />
      <List spacing={3}>
        {genres.map((genre) => (
          <ListItem
            key={genre.id}
            fontSize="sm"
            px="3"
            py="2"
            borderRadius="md"
            fontWeight="medium"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{ bgColor: hoverColor[colorMode] }}
          >
            {genre.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GenreList;
