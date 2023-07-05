import { columns } from "@/components/orders/columns";
import { DataTable } from "./components/orders/data-table";

import { loadOrders } from "./firebase/firestore";


function App() {
  const orders = loadOrders();
  return (
    <div className="h-screen w-screen flex flex-col gap-12 items-center justify-center">
      <DataTable columns={columns} data={orders} />
    </div>
  );
}


export default App;
