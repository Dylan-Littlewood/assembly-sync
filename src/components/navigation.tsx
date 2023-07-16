import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "@/firebase/config";
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/lib/Theme";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo";
import { Link } from "react-router-dom";


export default function Navigation() {
  const [user] = useAuthState(auth);
  console.log(user?.displayName);
  return (
    <div className="flex justify-between w-full p-4 gap-4 absolute top-0 items-center">
      <Link to={'/'}><div className="flex gap-4 justify-center items-center"><Logo/><h1 className="text-lg">Assembly Sync</h1></div></Link>
      <div className="flex gap-4 justify-center items-center">
        <Link to={'/Dashboard'}><Button variant={'outline'}>Dashboard</Button></Link>
        <Link to={'/Schedule'}><Button variant={'outline'}>Schedule</Button></Link>
      </div>
      <div className="flex gap-4 justify-center items-center">
        {user?.displayName &&
            <>
              <p>{user.displayName}</p>
              <UserNav employeeID={user?.uid} />
            </>
            }
          <ThemeToggle />
      </div>
      </div>
  )
}
