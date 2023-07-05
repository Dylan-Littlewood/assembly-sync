import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "@/firebase/config";
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";


function SignIn() {
  return <Button onClick={signInWithGoogle}>Sign In</Button>;
}

export default function Navigation() {
  const [user] = useAuthState(auth);
  return (
    <div className="flex justify-end w-full p-4 gap-4 absolute top-0 items-center">
      {user ? (
      <>
        <p>{user.displayName}</p>
        <UserNav employeeID={user?.uid} />
      </>
    ) : (
      <SignIn />
    )}
        <ThemeToggle />
      </div>
  )
}
