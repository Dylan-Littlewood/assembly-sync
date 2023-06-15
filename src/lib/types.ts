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
  workOrder: string;
  status: 'Picking' | 'Processing' | 'Complete' | 'Issue';
  saleOrder: number;
  customerName: string;
  product: string;
  quantity: Quantity;
  assigned: string[];
};
