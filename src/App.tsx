import { columns } from '@/components/orders/columns';
import { DataTable } from './components/orders/data-table';
import { mockData } from './lib/data';
import { UserNav } from './components/user-nav';
import { ThemeToggle } from './components/theme-toggle';

function App() {
  const employee = 'testid1';
  return (
    <div className='h-screen w-screen flex flex-col gap-12 items-center justify-center'>
      <ThemeToggle />
      <UserNav employeeID={employee} />
      <DataTable columns={columns} data={mockData} />
    </div>
  );
}

export default App;
