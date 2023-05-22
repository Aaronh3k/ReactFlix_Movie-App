import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  Link,
} from "@chakra-ui/react";
import Register from './Register';
import Login from './Login';

interface HomePageProps {
  session: string | null;
  handleLogin: (email: string, password: string) => void;
  handleRegister: (email: string, password: string, name: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ session, handleLogin, handleRegister }) => {
  const [isRegister, setIsRegister] = useState(false);

  const switchMode = () => {
    setIsRegister(prev => !prev);
  }

  return (
    <Box
      w="100vw"
      h="100vh"
      bgImage="url('https://source.unsplash.com/random?entertainment')"
      bgSize="cover"
      bgPosition="center"
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDirection="column"
      userSelect="none"
    >
      <VStack
        spacing={5}
        textAlign="center"
        bg="rgba(0, 0, 0, 0.6)"
        p={6}
        borderRadius="md"
      >
        <Heading color="white" fontSize="4xl">
          Welcome to ReactFlix!
        </Heading>
        <Text color="white" fontSize="xl">
          ReactFlix is your ultimate destination for movies and TV shows. Browse
          through our amazing collection of movies and TV shows, check out
          trending content, and add your favorites to your personal list.
        </Text>
        {!session && (
          <>
            {isRegister ? (
              <Register registerUser={handleRegister} />
            ) : (
              <Login loginUser={handleLogin} />
            )}
            <Button onClick={switchMode}>
              {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
            </Button>
          </>
        )}
        {session && (
          <>
            <HStack spacing={4}>
              {[
                { href: "/movies", label: "Movies" },
                { href: "/tvshows", label: "TV Shows" },
                { href: "/people", label: "People" },
                { href: "/trending", label: "Trending" },
                { href: "/favorites", label: "Favorites" },
              ].map(({ href, label }) => (
                <Link href={href} key={href} textDecoration="none">
                  <Button
                    bg="rgba(30, 144, 255, 0.8)"
                    _hover={{ bg: "rgba(30, 144, 255, 1)" }}
                    color="white"
                    fontWeight="bold"
                    borderRadius="md"
                  >
                    {label}
                  </Button>
                </Link>
              ))}
            </HStack>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default HomePage;