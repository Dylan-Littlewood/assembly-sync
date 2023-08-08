import { Timestamp } from "@firebase/firestore"

export type Quantity = {
  total: number | '';
  completed: number;
};

export type Dates = {
  scheduled: boolean;
  dispatch?: Timestamp;
  build?: Timestamp;
}

export type Employee = {
  id: string;
  name: string;
  img: string;
  role: string;
};

export type Order = {
  workOrder: string;
  status: 'New' | 'Picking' | 'Processing' | 'Complete' | 'Issue';
  saleOrder: number | '';
  customerName: string;
  product: Product;
  quantity: Quantity;
  dates: Dates;
  assigned: string[];
};
export type OrderUpdate = Partial<Order>

export type Product = {
  name: string;
  sku: string;
  buildTimeMinutes?: number;
}

export const BlankOrder: Order = {
  workOrder: "",
  status: "New",
  saleOrder: "",
  customerName: "",
  product: {
    name: "",
    sku: "",
  },
  quantity: {
    total: "",
    completed: 0,
  },
  dates: {
    scheduled: false,
  },
  assigned: [],
}

export type ErrorType = {
  id?: string;
  message?: string;
}