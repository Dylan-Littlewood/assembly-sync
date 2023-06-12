import { columns } from "@/components/orders/columns";
import { DataTable } from "./components/orders/data-table";
import { mockData } from "./lib/data";
import { UserNav } from "./components/user-nav";
import { ThemeToggle } from "./components/theme-toggle";
import { Button } from "./components/ui/button";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

function App() {
  const [user] = useAuthState(auth);
  //const [employees] = useCollectionData(collection(firestore, "Users"));
  //console.log(employees);
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
      <DataTable columns={columns} data={mockData} />
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  return <Button onClick={signInWithGoogle}>Sign In</Button>;
}
export function SignOut() {
  return auth.currentUser && auth.signOut();
}

export default App;
