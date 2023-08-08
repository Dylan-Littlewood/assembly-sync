import { NewOrderDialog } from '@/components/new-order-dialog'
import { scheduleColumns } from '@/components/orders/columns';
import { DataTable } from '@/components/orders/data-table';
import OrderList from '@/components/orders/orderList';
import { loadOrders } from '@/firebase/firestore';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn, datesMatch } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from 'react';


const ScheduleNav = ({date,setDate}:{date: Date | undefined, setDate: React.Dispatch<React.SetStateAction<Date | undefined>>}) => {
  return (
    <div className='w-full p-4 flex justify-end gap-8' >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <NewOrderDialog />
    </div>
  )
}

export default function Schedule() {
  var todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);
  const [date, setDate] = useState<Date | undefined>(todaysDate)
  const allOrders = loadOrders();
  const unscheduledOrders = allOrders.filter(order => order.dates.scheduled === false);
  const selectedOrders = allOrders.filter(order => datesMatch(order.dates.build, date));


  return (
    <div className="w-full h-full flex justify-between">
      <OrderList data={unscheduledOrders} />
      <div className='flex flex-col w-full gap-8'>
        <ScheduleNav date={date} setDate={setDate} />
        <div className='flex w-full h-full items-center justify-center'>
          <DataTable columns={scheduleColumns} data={selectedOrders} />
        </div>
      </div>
    </div>
  )
}

