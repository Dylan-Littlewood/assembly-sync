import { columns } from "@/components/orders/columns";
import { DataTable } from "./components/orders/data-table";
import { mockData } from "./lib/data";
import { UserNav } from "./components/user-nav";
import { ThemeToggle } from "./components/theme-toggle";
import { Button } from "./components/ui/button";
import { Input } from "@/components/ui/input"

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "./firebase/config";
import { loadOrders } from "./firebase/firestore";

function App() {
  const [user] = useAuthState(auth);
  const orders = loadOrders();
  return (
    <div className="h-screen w-screen flex flex-col gap-12 items-center justify-center">
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

      <DataTable columns={columns} data={orders} />
    </div>
  );
}

function SignIn() {

  return <Button onClick={signInWithGoogle}>Sign In</Button>;
}
export function SignOut() {
  return auth.currentUser && auth.signOut();
}

export default App;
