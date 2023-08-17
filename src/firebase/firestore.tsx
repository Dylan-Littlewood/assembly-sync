import { setDoc, collection, onSnapshot, updateDoc, doc, DocumentData, DocumentReference } from "@firebase/firestore";


import { db } from "./config";
import { useEffect, useState } from "react";
import { Employee, Order, OrderUpdate, Product } from "@/lib/types";

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
          setOrders(snapshot.docs.map((order)=>({...order.data()} as Order)))
        })
        return unsubscribe;
  }
    useEffect(() => {
        getOrders();
    }, [])
  return orders;
}

export function updateOrder(id: string, data: OrderUpdate) {
  return updateDoc(doc(db, 'Orders', id), data);
}

export function loadProducts() {
  const [products, setProducts] = useState<Product[]>([]);
      const getProducts = async () => {
        const productsRef = collection(db, "Products");
        const unsubscribe = await onSnapshot(productsRef, (snapshot) => {
          setProducts(snapshot.docs.map((product)=>({...product.data()} as Product)))
        })
        return unsubscribe;
  }
    useEffect(() => {
        getProducts();
    }, [])
  return products;
}

export async function addProduct(product: Product) {
  try {
    await setDoc(doc(db, "Products", product.sku), product);
  } catch (error) {
    console.log(error);
  }
}

