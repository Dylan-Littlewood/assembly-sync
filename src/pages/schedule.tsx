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
  const unscheduledOrders = allOrders.filter(order => order.dates.scheduled === false)
  return (
    <div className="w-full h-full flex justify-between">
      <OrderList data={unscheduledOrders} />
      <div className='flex flex-col w-full gap-8'>
        <ScheduleNav />
        <div className='flex w-full h-full items-center justify-center'>
          <DataTable columns={columns} data={allOrders} />
        </div>
      </div>
    </div>
  )
}
