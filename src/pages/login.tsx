import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/firebase/config';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

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
        <p>Signed In User: {user.user.email}</p>
      </div>
    );
  }
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <form className='flex flex-col gap-4 w-96' onSubmit={() => signInWithEmailAndPassword(email, password)}>
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
          Sign In
        </Button>
        <p>No account? <Link to={'/SignUp'} className='underline'>Create one</Link></p>
        </form>
    </div>
  );
};