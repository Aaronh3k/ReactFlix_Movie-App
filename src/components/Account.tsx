import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

interface Props {
  session: { user: { id: string; email: string } };
}

const Account: React.FC<Props> = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const formBackground = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      let { data, error } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }

      setLoading(false);
    }

    getProfile();
  }, [session]);

  async function updateProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      userSelect="none"
    >
      <Container maxW="container.md" py={12}>
        <Heading mb={6} textAlign="center">
          Account Settings
        </Heading>
        <Box
          borderWidth={1}
          borderRadius="lg"
          bg={formBackground}
          p={6}
          boxShadow="md"
        >
          <form onSubmit={updateProfile}>
            <VStack spacing={4} alignItems="start">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="text"
                  value={session.user.email}
                  disabled
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input
                  id="username"
                  type="text"
                  required
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="website">Website</FormLabel>
                <Input
                  id="website"
                  type="website"
                  value={website || ""}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={loading}
                loadingText="Loading..."
              >
                Update
              </Button>
              {/* <Button
                type="button"
                colorScheme="red"
                onClick={() => supabase.auth.signOut()}
              >
                Sign Out
              </Button> */}
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Account;
