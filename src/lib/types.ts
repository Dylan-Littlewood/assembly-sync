export type Quantity = {
  total: number | '';
  completed: number;
};

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
  product: string;
  quantity: Quantity;
  assigned: string[];
};

export const BlankOrder: Order = {
  workOrder: "",
  status: "New",
  saleOrder: "",
  customerName: "",
  product: "",
  quantity: {
    total: "",
    completed: 0,
  },
  assigned: [],
}