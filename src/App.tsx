import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import AppContent from "./AppContent";
import HomePage from "./components/HomePage";

function App() {
  const [session, setSession] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    const response = await fetch('/api/accounts/security/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    const data = await response.json();
  
    if (data.token) {
      sessionStorage.setItem('token', data.token);
      setSession(data.token);
    } else {
      alert("Login failed");
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    const [firstName, lastName] = name.split(' ');
  
    const response = await fetch('/api/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName })
    });
  
    const data = await response.json();
  
    if (data.id) {
      handleLogin(email, password);
    } else {
      alert("Registration failed");
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setSession(token);
  }, []);

  return (
    <Router>
      <Box margin={0}>
        {session ? (
          <AppContent 
            session={session} 
            handleLogin={handleLogin}
            handleRegister={handleRegister}
          />
        ) : (
          <HomePage 
            session={session} 
            handleLogin={handleLogin} 
            handleRegister={handleRegister} 
          />
        )}
      </Box>
    </Router>
  );
}

export default App;