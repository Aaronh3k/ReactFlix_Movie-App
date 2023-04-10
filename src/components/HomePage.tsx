import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Button,
} from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import SignIn from "./SignIn";

interface HomePageProps {
  session: Session | null;
}

const HomePage: React.FC<HomePageProps> = ({ session }) => {
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
        {!session && <SignIn />}
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
