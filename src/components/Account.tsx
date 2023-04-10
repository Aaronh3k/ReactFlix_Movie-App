import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

interface Props {
  session: { user: { id: string; email: string } };
}

const Account: React.FC<Props> = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

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
    <Box>
      <form onSubmit={updateProfile}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="text" value={session.user.email} disabled />
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
          <Button type="submit" isLoading={loading} loadingText="Loading...">
            Update
          </Button>
          <Button type="button" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Account;
