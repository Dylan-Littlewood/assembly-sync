import { OrderCard } from "./orderCard";
import { Order } from "@/lib/types"

export default function OrderList({data}:{data: Order[]}) {
  return (
    <div className=" m-4 flex flex-col gap-4  w-[500px]">
      <h3 className="text-2xl p-2 font-semibold underline underline-offset-4 leading-none tracking-tight">Unscheduled Orders</h3>
        <div className="flex flex-col gap-4 h-auto overflow-y-auto">
          {data.map(order => {
            return <OrderCard key={order.workOrder} order={order} />
          })}
        </div>
      </div>
  )
}
