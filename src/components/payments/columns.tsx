import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  status: 'Missing Stock' | 'Processing' | 'Complete';
  workOrder: string;
  saleOrder: number;
  customerName: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'workOrder',
    header: 'Work Order',
  },
  {
    accessorKey: 'saleOrder',
    header: 'Sale Order',
  },
  {
    accessorKey: 'customerName',
    header: 'Customer Name',
  },
];
