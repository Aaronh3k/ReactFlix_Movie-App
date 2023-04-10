import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { supabase } from "./supabaseClient";
import SignIn from "./components/SignIn";
import AppContent from "./AppContent";
import { Session } from "@supabase/supabase-js";
import HomePage from "./components/HomePage";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .catch((error) => {
        console.error("Error getting session:", error);
      });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Box margin={0}>
        {session ? (
          <AppContent session={session} />
        ) : (
          <HomePage session={session} />
        )}
      </Box>
    </Router>
  );
}

export default App;
