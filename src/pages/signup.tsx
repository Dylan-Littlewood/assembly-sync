import { auth, db } from '@/firebase/config';
import React, { useContext, useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';

import { doc, setDoc } from "firebase/firestore";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/assets/logo';
import { ThemeToggle } from '@/lib/Theme';
import { ErrorElement } from '@/error-page';
import Spinner from '@/components/ui/spinner';
import { AuthContext } from '@/context/AuthContext';



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

  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext)

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const currentUser = await createUserWithEmailAndPassword(
        email,
        password
      )
      if(dispatch && currentUser) { dispatch({ type: "LOGIN", payload: currentUser.user }) };
      const photoURL = "";
      await updateProfile({ displayName, photoURL });
      await setDoc(doc(db, "Users", currentUser?.user.uid as string), {
        img:null,
        name: displayName,
        role:""
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-between w-full p-4 gap-4 absolute top-0 items-center">
        <Link to={'/'}><div className="flex gap-4 justify-center items-center"><Logo /><h1 className="text-lg">Assembly Sync</h1></div></Link>
        <div className="flex gap-4 justify-center items-center">
          <ThemeToggle />
        </div>
      </div>
      <div className='h-screen w-screen flex flex-col items-center justify-center'>
        <form className='flex flex-col gap-4 w-96' onSubmit={handleSignUp}>
          <h2 className='text-6xl mb-12 text-center'>Sign Up</h2>
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
          {error && <ErrorElement error={error}/>}
          <Button type='submit' className='mt-8'>
            {loading ? <Spinner /> : "Register"}
          </Button>
          <p>Already have an account? <Link to={'/Login'} className='underline'>Sign In</Link></p>
        </form>
      </div>
    </>
  );
};