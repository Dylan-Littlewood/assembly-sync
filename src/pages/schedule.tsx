import { NewOrderDialog } from '@/components/new-order-dialog'
import { columns } from '@/components/orders/columns';
import { DataTable } from '@/components/orders/data-table';
import { loadOrders } from '@/firebase/firestore';

export default function Schedule() {
  const allOrders = loadOrders();
  const orders = allOrders.filter(order =>  order.status === 'New')
  return (
    <div>
      <NewOrderDialog />
      <DataTable columns={columns} data={orders} />
    </div>
  )
}
