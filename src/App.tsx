import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import AppContent from "./AppContent";
import HomePage from "./components/HomePage";

function App() {
  const [session, setSession] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    const response = await fetch('/api/accounts/security/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
  
    if (data.token) {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user_id', data.user_id);
      sessionStorage.setItem('email', data.email);
      setSession(data.token);
      setUserId(data.user_id);
      setEmail(data.email);
    } else {
      alert("Login failed");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('email');
    setSession(null);
    setUserId(null);
    setEmail(null);
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
    const user_id = sessionStorage.getItem('user_id');
    const email = sessionStorage.getItem('email')
    setSession(token);
    setUserId(user_id);
    setEmail(email)
  }, []);
  
  return (
    <Router>
      <Box margin={0}>
        {session ? (
          <AppContent 
            session={session}
            userId={userId}
            email={email}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
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