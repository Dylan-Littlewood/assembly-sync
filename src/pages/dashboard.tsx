import { columns } from "@/components/orders/columns";
import { DataTable } from "@/components/orders/data-table";

import { loadOrders } from "@/firebase/firestore";

export default function Dashboard() {
  const orders = loadOrders();
  return (

    <DataTable columns={columns} data={orders} />
  )
}
