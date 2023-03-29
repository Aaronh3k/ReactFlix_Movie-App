// src/components/NavBar.tsx

import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import logo from "../assets/logo.webp";
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
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding={{ base: "10px", lg: "10px 20px" }}
        maxWidth="1200px"
        margin="auto"
        width="100%"
        marginLeft={{ base: "3px", lg: "7px" }}
      >
        {/* Group logo and Home heading */}
        <Flex alignItems="center">
          <Image src={logo} boxSize="60px" />
          <Text
            as={Link}
            to="/"
            fontWeight="bold"
            fontSize="lg"
            textDecoration="none"
            marginLeft="10px"
            _hover={{ textDecoration: "underline" }}
          >
            Home
          </Text>
        </Flex>
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
        <ColorModeSwitch />
      </Flex>
    </Box>
  );
};

export default NavBar;
