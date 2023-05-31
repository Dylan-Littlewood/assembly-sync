export type Quantity = {
  total: number;
  completed: number;
};

export type Employee = {
  id: string;
  name: string;
  img: string;
  role: string;
};

export type Order = {
  id: string;
  status: 'Picking' | 'Processing' | 'Complete' | 'Issue';
  workOrder: string;
  saleOrder: number;
  customerName: string;
  product: string;
  Quantity: Quantity;
  assigned: string[];
};
