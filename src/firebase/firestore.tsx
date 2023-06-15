import { collection, onSnapshot, setDoc, doc } from "@firebase/firestore";


import { db } from "./config";
import { useEffect, useState } from "react";
import { Employee, Order } from "@/lib/types";

export function loadEmployees() {
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
  return employees;
}

export function getEmployee(employees: Employee[], employeeID: string) {

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

export function loadOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
      const getOrders = async () => {
        const ordersRef = collection(db, "Orders");
        const unsubscribe = await onSnapshot(ordersRef, (snapshot) => {
          setOrders(snapshot.docs.map((order)=>({...order.data(), workOrder:order.id} as Order)))
        })
        return unsubscribe;
  }
    useEffect(() => {
        getOrders();
    }, [])
  return orders;
}

export async function addOrder(wo: string, name: string)  {
  await setDoc(doc(db, "Orders", wo), {
      status: "Issue",
      saleOrder: 40762,
      customerName: name,
      product: "ARENA",
      quantity: {
        total: 1,
        completed: 0,
      },
      assigned: [],
    });
}

// ,