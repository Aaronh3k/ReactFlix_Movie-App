import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
import { FaUserCircle, FaUser, FaGlobe, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface Props {
  userId: string | null;
  email: string | null;
}

const Account: React.FC<Props> = ({ userId, email }) => {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState<string | null>(null);
  const pageBackground = useColorModeValue("gray.100", "gray.800");
  const formBackground = useColorModeValue("white", "gray.700");

  useEffect(() => {
    async function getProfile() {
      setLoading(true);

      const response = await fetch('/api/accounts/' + userId, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('token') || '' }
      });

      const data = await response.json();

      if (data) {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setUsername(data.username);
        setWebsiteUrl(data.websiteUrl);
      }

      setLoading(false);
    }

    getProfile();
  }, []);

  async function updateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveProfile();
    window.location.reload();
  }

  async function saveProfile() {
    setLoading(true);

    const updates = {
      id: userId,
      firstName: firstName,
      lastName: lastName,
      username: username,
      websiteUrl: websiteUrl,
    };

    const response = await fetch('/api/accounts/' + userId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('token') || '' },
      body: JSON.stringify(updates)
    });

    const data = await response.json();

    if (!data) {
      alert('Profile update failed');
    }

    setLoading(false);
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
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="text" value={email} />
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
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaUser />}
                    />
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName || ""}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaUser />}
                    />
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName || ""}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="websiteUrl">Website</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaGlobe />}
                    />
                    <Input
                      id="websiteUrl"
                      type="url"
                      value={websiteUrl || ""}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
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
