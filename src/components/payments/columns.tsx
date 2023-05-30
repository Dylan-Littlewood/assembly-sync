import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Badge } from '../ui/badge';
import { VariantProps } from 'class-variance-authority';

type variant = 'default' | 'secondary' | 'outline' | 'complete' | 'processing' | 'picking' | 'issue' | null | undefined;

type Quantity = {
  total: number;
  completed: number;
};

type User = {
  id: string;
  name: string;
  img: string;
};

const mockUsers: User[] = [
  {
    id: 'testid1',
    name: 'Dylan Littlewood',
    img: 'https://github.com/Dylan-Littlewood.png',
  },
  {
    id: 'testid2',
    name: 'shadcn',
    img: 'https://github.com/shadcn.png',
  },
  {
    id: 'testid3',
    name: 'Ben Wall',
    img: '',
  },
];

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  status: 'Picking' | 'Processing' | 'Complete' | 'Issue';
  workOrder: string;
  saleOrder: number;
  customerName: string;
  product: string;
  Quantity: Quantity;
  assigned: string[];
};
var getInitials = function (name: string) {
  var parts = name.split(' ');
  var initials = '';
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].length > 0 && parts[i] !== '') {
      initials += parts[i][0];
    }
  }
  return initials;
};

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: 'Quantity',
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
  {
    accessorKey: 'assigned',
    header: 'Assigned',
    minSize: 20000,
    cell: ({ getValue }) => {
      return (
        <div className='flex gap-2'>
          {getValue<string[]>().map(userID => {
            const user = mockUsers.find(u => u.id === userID);
            if (user) {
              return (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar>
                        <AvatarImage src={user.img} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{user.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            } else {
              return (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar>
                        <AvatarFallback className=' bg-red-200'>
                          <AlertCircle color='red' />
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>User Not Found</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }
          })}
        </div>
      );
    },
  },
];
