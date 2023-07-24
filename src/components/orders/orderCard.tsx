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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { updateOrder } from "@/firebase/firestore";
import { Timestamp } from "@firebase/firestore";

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
        <Button variant="outline">Edit</Button>
        <CalendarPopover workOrder={order.workOrder} />
      </CardFooter>
    </Card>
  )
}

const CalendarPopover = ({workOrder}:{workOrder:string}) => {
  const [date, setDate] = useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
          <Button>Schedule</Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
        <Button className="w-full" disabled={date === undefined} onClick={(e) => {
          if (date) {
            updateOrder(workOrder, { dates: { scheduled: true, build: Timestamp.fromDate(date) } })
          }
        }}>Confirm</Button>
      </PopoverContent>
    </Popover>
  )
}
