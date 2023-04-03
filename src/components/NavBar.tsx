import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  Spacer,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ColorModeSwitch from "./ColorModeSwitch";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.700" };
  const borderColor = { light: "gray.200", dark: "gray.600" };

  return (
    <Box
      bgColor={bgColor[colorMode]}
      borderBottomWidth="1px"
      borderColor={borderColor[colorMode]}
      boxShadow="sm"
      userSelect="none"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding={{ base: "10px", lg: "10px 20px" }}
        margin="auto"
        width="100%"
        marginLeft={{ base: "3px", lg: "7px" }}
      >
        <Text fontWeight="bold" fontSize="2xl" textDecoration="none">
          ReactFlix
        </Text>
        <Spacer />
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search movies"
            variant="filled"
            borderRadius="md"
          />
        </InputGroup>
        <Spacer />
        <Flex alignItems="center">
          <ChakraLink
            as={Link}
            to="/"
            ml={4}
            _hover={{ textDecoration: "underline" }}
          >
            Home
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/movies"
            ml={4}
            _hover={{ textDecoration: "underline" }}
          >
            Movies
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/tvshows"
            ml={4}
            _hover={{ textDecoration: "underline" }}
          >
            TV Shows
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/trending"
            ml={4}
            _hover={{ textDecoration: "underline" }}
          >
            Trending
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/favorites"
            ml={4}
            _hover={{ textDecoration: "underline" }}
          >
            Favourites
          </ChakraLink>
        </Flex>
        <Spacer />
        <ColorModeSwitch />
      </Flex>
    </Box>
  );
};

export default NavBar;
