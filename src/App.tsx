import { Payment, columns } from '@/components/payments/columns';
import { DataTable } from './components/payments/data-table';

const mockData: Payment[] = [
  {
    id: '728ed52f',
    status: 'Complete',
    workOrder: 'WO2382',
    saleOrder: 35682,
    customerName: 'The PC Factory',
    product: 'FLM',
    Quantity: {
      total: 50,
      completed: 50,
    },
    assigned: ['testid2', 'testid1'],
  },
  {
    id: '489e1d42',
    status: 'Processing',
    workOrder: 'WO2194',
    saleOrder: 40521,
    customerName: 'Bluebell Wood School',
    product: 'ASPS',
    Quantity: {
      total: 200,
      completed: 27,
    },
    assigned: ['testid1', 'testid3', 'testid4'],
  },
  {
    id: '489e1d42',
    status: 'Picking',
    workOrder: 'WO3168',
    saleOrder: 40762,
    customerName: 'Creative Hut',
    product: 'ARENA',
    Quantity: {
      total: 2,
      completed: 0,
    },
    assigned: [],
  },
  {
    id: '489e1d42',
    status: 'Issue',
    workOrder: 'WO3169',
    saleOrder: 40762,
    customerName: 'Creative Hut',
    product: 'ARENA',
    Quantity: {
      total: 1,
      completed: 0,
    },
    assigned: [],
  },
  // ...
];

function App() {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <DataTable columns={columns} data={mockData} />
    </div>
  );
}

export default App;
