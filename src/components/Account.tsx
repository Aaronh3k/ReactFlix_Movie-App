import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
  InputGroup,
  InputLeftAddon,
  Flex,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import Avatar from "./Avatar";
import { FaUserCircle, FaUser, FaGlobe, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface Props {
  session: { user: { id: string; email: string } };
}

const Account: React.FC<Props> = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const pageBackground = useColorModeValue("gray.100", "gray.800");
  const formBackground = useColorModeValue("white", "gray.700");

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      let { data, error } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setFullName(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }

      setLoading(false);
    }

    getProfile();
  }, [session]);

  async function updateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveProfile();
    window.location.reload();
  }

  async function saveProfile() {
    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      full_name: fullName,
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

  async function handleAvatarUpload(
    event: ChangeEvent<HTMLInputElement>,
    url: string
  ) {
    setAvatarUrl(url);
    await saveProfile();
  }

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="account-container"
      bg={pageBackground}
      minHeight="100vh"
      userSelect="none"
    >
      <Container maxW="container.lg" py={12}>
        <Flex justifyContent="center">
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            borderWidth={1}
            borderRadius="lg"
            bg={formBackground}
            p={10}
            boxShadow="2xl"
            className="account-form"
            width="100%"
            maxW="500px"
          >
            <form onSubmit={updateProfile}>
              <VStack spacing={4} alignItems="center">
                <Avatar
                  url={avatar_url}
                  size={150}
                  email={session.user.email}
                  onUpload={handleAvatarUpload}
                />
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="text" value={session.user.email} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="username">User Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaUserCircle />}
                    />
                    <Input
                      id="username"
                      type="text"
                      required
                      value={username || ""}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="fullName">Full Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaUser />}
                    />
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName || ""}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="website">Website</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaGlobe />}
                    />
                    <Input
                      id="website"
                      type="url"
                      value={website || ""}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={loading}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </Button>
              </VStack>
            </form>
          </MotionBox>
        </Flex>
      </Container>
    </MotionBox>
  );
};

export default Account;
