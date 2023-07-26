import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarClock } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { updateOrder } from "@/firebase/firestore";
import { Timestamp } from "@firebase/firestore";


export const CalendarPopover = ({workOrder}:{workOrder:string}) => {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
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
            updateOrder(workOrder, { dates: { scheduled: true, build: Timestamp.fromDate(date) } });
            setOpen(false);
          }
        }}>Confirm</Button>
      </PopoverContent>
    </Popover>
  )
}