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
import { useState } from "react";
import useGenres from "../hooks/useGenres";
import useTVGenres from "../hooks/useTVGenres";

interface props {
  onGenreSelect: (genreId: number) => void;
  type: "movie" | "tv";
}

const GenreList = ({ onGenreSelect, type }: props) => {
  const { genres, error, isLoading } =
    type === "movie" ? useGenres() : useTVGenres();
  const { colorMode } = useColorMode();
  const [activeGenre, setActiveGenre] = useState<number | null>(null);
  const bgColor = { light: "white", dark: "gray.700" };
  const borderColor = { light: "gray.200", dark: "gray.600" };
  const hoverColor = { light: "gray.200", dark: "gray.500" };
  const activeColor = { light: "blue.200", dark: "blue.700" };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return null;
  }

  const handleGenreClick = (genreId: number) => {
    setActiveGenre(genreId);
    if (onGenreSelect) {
      onGenreSelect(genreId);
    }
  };

  return (
    <Box
      boxShadow="md"
      borderWidth="1px"
      borderRadius="md"
      borderColor={borderColor[colorMode]}
      p="4"
      bgColor={bgColor[colorMode]}
      userSelect="none"
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
            cursor={genre.id === activeGenre ? "default" : "pointer"}
            transition="all 0.2s"
            bgColor={genre.id === activeGenre ? activeColor[colorMode] : ""}
            _hover={{ bgColor: hoverColor[colorMode] }}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GenreList;
