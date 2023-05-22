// components/Login.tsx

import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

interface LoginProps {
  loginUser: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUser(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </FormControl>

      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </FormControl>

      <Button type="submit">Login</Button>
    </form>
  );
};

export default Login;