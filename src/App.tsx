import { Payment, columns } from '@/components/payments/columns';
import { DataTable } from './components/payments/data-table';

const mockData: Payment[] = [
  {
    id: '728ed52f',
    status: 'Complete',
    workOrder: 'WO2382',
    saleOrder: 35682,
    customerName: 'The PC Factory',
  },
  {
    id: '489e1d42',
    status: 'Processing',
    workOrder: 'WO2194',
    saleOrder: 40521,
    customerName: 'Bluebell Wood School',
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
