import { auth, db } from '@/firebase/config';
import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';

import { doc, setDoc } from "firebase/firestore";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';



export const SignUp = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        email,
        password
      );
      const photoURL = "";
      await updateProfile({ displayName, photoURL });
      await setDoc(doc(db, "Users", res?.user.uid as string), {
        img:null,
        name: displayName,
        role:""
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Registered User: {user.user.email}</p>
      </div>
    );
  }
  return (

    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <form className='flex flex-col gap-4 w-96' onSubmit={handleSignUp}>
        <Label htmlFor="name">
          Full Name
        </Label>
        <Input
          id='name'
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <Label htmlFor="email">
          Email
        </Label>
        <Input
          id='email'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label htmlFor="password">
          Password
        </Label>
        <Input
          id='password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit' className='mt-8'>
          Register
        </Button>
      </form>
    </div>
  );
};