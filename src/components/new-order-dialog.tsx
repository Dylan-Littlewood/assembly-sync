import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addOrder } from "@/firebase/firestore"
import { PlusCircle } from "lucide-react"
import { useState } from "react"

export function NewOrderDialog() {
  const [wo, setWO] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className=' hover:text-accent-foreground hover:bg-accent relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>New Order</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={(event) => {
          addOrder(wo, name);
          setOpen(false);
          event.preventDefault();
        }}>
          <DialogHeader>
            <DialogTitle>New Order</DialogTitle>
            <DialogDescription>
              Add a new order to the schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="wo" className="text-right">
                Work Order
              </Label>
              <Input id="wo" className="col-span-3" value={wo}
            onChange={(e) => setWO(e.target.value)}/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Customer Name
              </Label>
              <Input id="name" className="col-span-3" value={name}
                onChange={(e) => setName(e.target.value)}/>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
