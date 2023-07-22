import { columns } from "@/components/orders/columns";
import { DataTable } from "@/components/orders/data-table";
import { loadOrders } from "@/firebase/firestore";
import { isToday } from "@/lib/utils";

export default function Dashboard() {
  const allOrders = loadOrders();
  const orders = allOrders.filter(order => isToday(order.dates.build));
  return (
      <DataTable columns={columns} data={orders} />
  )
}
