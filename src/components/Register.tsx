// components/Register.tsx

import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

interface RegisterProps {
  registerUser: (email: string, password: string, name: string) => void;
}

const Register: React.FC<RegisterProps> = ({ registerUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    await registerUser(email, password, name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </FormControl>

      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </FormControl>

      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </FormControl>

      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </FormControl>

      <Button type="submit">Register</Button>
    </form>
  );
};

export default Register;