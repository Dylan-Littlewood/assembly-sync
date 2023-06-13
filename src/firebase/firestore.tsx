import { collection, onSnapshot } from "@firebase/firestore";


import { db } from "./config";
import { useEffect, useState } from "react";
import { Employee } from "@/lib/types";



export function getEmployee(employeeID: string) {
  const [employees, setEmployees] = useState<Employee[]>([]);
      const getEmployees = async () => {
        const usersRef = collection(db, "Users");
        const unsubscribe = await onSnapshot(usersRef, (snapshot) => {
          setEmployees(snapshot.docs.map((user)=>({...user.data(), id:user.id} as Employee)))
        })
        return unsubscribe;
      }
      useEffect(() => {
        getEmployees();
      }, [])

  const employee = employees.find(u => u.id === employeeID);
  if (employee) {
    return employee;
  } else {
    return {
      id: employeeID,
      name: "User Not Found",
      img: "",
      role: "Unknown",
    };
  }
}
