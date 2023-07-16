import Logo from '@/assets/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/ui/spinner';
import { AuthContext } from '@/context/AuthContext';
import { ErrorElement } from '@/error-page';
import { auth } from '@/firebase/config';
import { ThemeToggle } from '@/lib/Theme';
import { useContext, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';



export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);


  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(email, password).then((currentUser) => {if (dispatch && currentUser) {dispatch({ type: "LOGIN", payload: currentUser.user })}
    navigate("/");})

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

        <form className='flex flex-col gap-4 w-96' onSubmit={handleLogin}>
          <h2 className='text-6xl mb-12 text-center'>Log In</h2>
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
            {loading ? <Spinner/> : "Sign In" }
          </Button>
          <p>No account? <Link to={'/SignUp'} className='underline'>Create one</Link></p>
          </form>
        </div>
      </>
  );
};