import { Button } from "@/components/ui/button"
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

type variant = 'default' | 'secondary' | 'outline' | 'complete' | 'processing' | 'picking' | 'issue' | null | undefined;

export function OrderCard({ order }: { order: Order }) {
  const status = order.status.toLowerCase() as variant;
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{order.customerName}</CardTitle>
        <CardDescription>{order.product}</CardDescription>
        <div>
          <Badge variant={status}>{order.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Work Order
            </p>
            <p className="text-sm text-muted-foreground">
              {order.workOrder}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Sale Order
            </p>
            <p className="text-sm text-muted-foreground">
              {order.saleOrder}
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
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive">Delete</Button>
        <Button variant="outline">Schedule</Button>
        <Button variant="outline">Edit</Button>
      </CardFooter>
    </Card>
  )
}
