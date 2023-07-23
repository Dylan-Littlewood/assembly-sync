import { OrderCard } from "./orderCard";
import { Order } from "@/lib/types"

export default function OrderList({data}:{data: Order[]}) {
  return (
    <div className="p-4 flex flex-col gap-4 h-full w-[500px] overflow-y-auto">
      {data.map(order => {
        return <OrderCard key={order.workOrder} order={order} />
      })}
    </div>
  )
}
