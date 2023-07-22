import { NewOrderDialog } from '@/components/new-order-dialog'
import { columns } from '@/components/orders/columns';
import { DataTable } from '@/components/orders/data-table';
import OrderList from '@/components/orders/orderList';
import { loadOrders } from '@/firebase/firestore';

const ScheduleNav = () => {
  return (
    <div className='w-full p-4 flex justify-end' >
      <NewOrderDialog />
    </div>
  )
}

export default function Schedule() {
  const allOrders = loadOrders();
  const orders = allOrders.filter(order =>  order.status === 'New')
  return (
    <div className="w-full h-full flex justify-between">
      <OrderList />
      <div className='flex flex-col gap-8'>
        <ScheduleNav />
        <DataTable columns={columns} data={orders} />
      CardWithForm</div>
    </div>
  )
}
