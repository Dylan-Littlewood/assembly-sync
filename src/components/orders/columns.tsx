import { ColumnDef, Getter } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Badge } from '../ui/badge';
import { Order, Quantity } from '@/lib/types';
import { getInitials } from '@/lib/utils';
import { getEmployee, loadEmployees, updateOrder } from '@/firebase/firestore';
import { Button } from '../ui/button';
import { CalendarPopover } from '../calendarPopover';
import { EditOrderDialog } from '../edit-order-dialog';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';

type variant = 'default' | 'secondary' | 'outline' | 'complete' | 'processing' | 'picking' | 'issue' | null | undefined;

type Cell = ({ getValue }: { getValue: Getter<unknown>; }) => JSX.Element;

type Schema = {
  header: string;
  accessorKey: string;
  cell?: Cell
}[]


const statusBadge: Cell = ({ getValue }) => {
  const status = getValue<string>().toLowerCase() as variant;
  return <Badge variant={status}>{getValue<string>()}</Badge>;
}

const avatar: Cell = ({ getValue }) => {
  const employees = loadEmployees();
  return (
    <div className='flex gap-2'>
      {getValue<string[]>().map(userID => {
        const user = getEmployee(employees, userID);
          return (
            <TooltipProvider key={userID}>
              <Tooltip>
                <TooltipTrigger>
                  {(user.name === 'User Not Found') ?
                    <Avatar>
                      <AvatarFallback className=' bg-red-200'>
                        <AlertCircle color='red' />
                      </AvatarFallback>
                    </Avatar>
                    :
                    <Avatar>
                      <AvatarImage src={user.img} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  }
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
      })}
    </div>
  );
}


const defaultColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: statusBadge,
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
  {
    accessorKey: 'product',
    header: 'Product',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ getValue }) => {
      const quantity = getValue<Quantity>();
      return (
        <p>
          {quantity.completed} / {quantity.total}
        </p>
      );
    },
  },
];
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const buildColumns: ColumnDef<Order>[] = [
  ...defaultColumns,
  {
    accessorKey: 'assigned',
    header: 'Assigned',
    minSize: 20000,
    cell: avatar,
  },
  {
    id: 'actions',
    cell: (props) => {

      const order = props.row.original;
      const [user] = useAuthState(auth);
      return (
        <div className='flex gap-4'>
          {
            user ? order.assigned.includes(user.uid) ?
            <Button onClick={() => { updateOrder(order.workOrder, { assigned: order.assigned.filter(employee => employee !== user.uid)})}} size='sm'>Leave</Button>
            :
            <Button onClick={() => { updateOrder(order.workOrder, { assigned: [...order.assigned, user.uid] }) }} size='sm'>Join</Button>
            :
              <Button disabled={true} size='sm'>Join</Button>
              }
        </div>
      );
    }
  },
];

export const scheduleColumns: ColumnDef<Order>[] = [
  ...defaultColumns,
  {
    id: 'actions',
    cell: (props) => {

      const order = props.row.original;
      return (
        <div className='flex gap-4'>
          <EditOrderDialog workOrder={order} />
          <CalendarPopover order={order} />
        </div>
      );
    }
  },
];

