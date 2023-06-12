import { collection } from "@firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { firestore } from "./firebase_config";



export function getEmployee() {
  const [employees] = useCollectionData(collection(firestore, "Users"));
  console.log(employees);
}