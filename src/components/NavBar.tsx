import {
  Box,
  Flex,
  Text,
  useColorMode,
  Spacer,
  Link as ChakraLink,
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { Link } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { IconButton } from "@chakra-ui/react";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  session: Session | null;
  handleLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ session, handleLogout }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.700" };
  const borderColor = { light: "gray.200", dark: "gray.600" };
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

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
            to="/people"
            ml={4}
            _hover={{ textDecoration: "underline" }}
          >
            People
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
        {session && (
          <Flex alignItems="center" ml={4}>
            <IconButton
              as={Link}
              to="/account"
              aria-label="Account"
              icon={<AiOutlineUser />}
              variant="ghost"
              borderRadius="full"
              mr={2}
              _hover={{ color: "blue.500" }}
            />
            <Text fontWeight="bold">Account</Text>
          </Flex>
        )}
        <Spacer />
        {session && (
  <Flex alignItems="center">
<IconButton
  aria-label="Sign Out"
  icon={<AiOutlineLogout />}
  variant="solid"
  colorScheme="red"
  borderRadius="full"
  onClick={handleLogoutClick}
  mr={2}
  _hover={{ boxShadow: "xl" }}
/>
    <Text fontWeight="bold" color="red.500">
      Sign Out
    </Text>
  </Flex>
)}

        <Spacer />

        <ColorModeSwitch />
      </Flex>
    </Box>
  );
};

export default NavBar;
