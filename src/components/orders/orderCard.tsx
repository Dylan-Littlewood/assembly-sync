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
import { CalendarPopover } from "../calendarPopover";

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
            <CalendarPopover order={order} /></div>
        </div>
      </CardContent>
    </Card>
  )
}

