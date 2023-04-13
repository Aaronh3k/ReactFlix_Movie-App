import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import {
  FormControl,
  Input,
  Button,
  VStack,
  Box,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState<{
    show: boolean;
    title: string;
    description: string;
    status: "error" | "success" | "info" | "warning";
  }>({
    show: false,
    title: "",
    description: "",
    status: "info",
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setAlert({
        show: true,
        title: "Error",
        description: error.message,
        status: "error",
      });
    } else {
      setAlert({
        show: true,
        title: "Success",
        description: "Check your email for the login link!",
        status: "success",
      });
    }

    setLoading(false);
  };

  const closeAlert = () => {
    setAlert({ show: false, title: "", description: "", status: "info" });
  };

  return (
    <>
      {alert.show && (
        <Alert
          status={alert.status}
          position="fixed"
          top={0}
          left={0}
          right={0}
          borderRadius={0}
          bg={alert.status === "error" ? "red.500" : "blue.500"}
          color="white"
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.2)"
          py={4}
        >
          <AlertIcon />
          <AlertTitle mr={2}>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={closeAlert}
            color="white"
            _hover={{ bg: "white", color: "black" }}
          />
        </Alert>
      )}

      <form onSubmit={handleLogin}>
        <VStack spacing={4} w="100%" maxW="400px">
          <Text fontSize="lg" color="white">
            To Access Please Sign In
          </Text>
          <Box w="100%">
            <FormControl id="email" isRequired>
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </FormControl>
          </Box>
          <Button
            type="submit"
            w="100%"
            colorScheme="blue"
            isLoading={loading}
            loadingText="Loading"
          >
            Sign In
          </Button>
        </VStack>
      </form>
    </>
  );
}
