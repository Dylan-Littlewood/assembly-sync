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
import { CalendarClock, Pencil } from "lucide-react";

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
              {order.product}
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
            <Button variant="outline" size='sm'><Pencil /></Button>
            <CalendarPopover workOrder={order.workOrder} /></div>
        </div>
      </CardContent>
    </Card>
  )
}

const CalendarPopover = ({workOrder}:{workOrder:string}) => {
  const [date, setDate] = useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
          <Button size='sm'><CalendarClock /></Button>
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
