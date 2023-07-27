import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AlertCircle, Pencil } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Badge } from '../ui/badge';
import { Order, Quantity } from '@/lib/types';
import { getInitials } from '@/lib/utils';
import { getEmployee, loadEmployees } from '@/firebase/firestore';
import { Button } from '../ui/button';
import { CalendarPopover } from '../calendarPopover';

type variant = 'default' | 'secondary' | 'outline' | 'complete' | 'processing' | 'picking' | 'issue' | null | undefined;


const defaultColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue<string>().toLowerCase() as variant;
      return <Badge variant={status}>{getValue<string>()}</Badge>;
    },
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
    cell: ({ getValue }) => {
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
    },
  },
  {
    id: 'actions',
    cell: (props) => {

      const workOrder = props.row.original.workOrder;
      return (
        <div className='flex gap-4'>
          <Button size='sm'>Join</Button>
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
          <Button variant="outline" size='sm'><Pencil /></Button>
          <CalendarPopover order={order} />
        </div>
      );
    }
  },
];

