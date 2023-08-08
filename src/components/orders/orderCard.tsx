import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "../ui/badge"
import { Order } from "@/lib/types"
import { CalendarPopover } from "../calendarPopover";
import { EditOrderDialog } from "../edit-order-dialog";

type variant = 'default' | 'secondary' | 'outline' | 'complete' | 'processing' | 'picking' | 'issue' | null | undefined;

export function OrderCard({ order }: { order: Order }) {
  const status = order.status.toLowerCase() as variant;
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle><div className="flex justify-between items-center"><h3>{order.workOrder} - ({order.saleOrder})</h3><Badge variant={status}>{order.status}</Badge></div></CardTitle>
        <CardDescription>{order.customerName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Product
            </p>
            <p className="text-sm text-muted-foreground">
              {`${order.product.name} (${order.product.sku})`}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Quantity
            </p>
            <p className="text-sm text-muted-foreground">
              {order.quantity.total}
            </p>
          </div>
          <div className="flex gap-2">
            <EditOrderDialog workOrder={order} />
            <CalendarPopover order={order} /></div>
        </div>
      </CardContent>
    </Card>
  )
}

