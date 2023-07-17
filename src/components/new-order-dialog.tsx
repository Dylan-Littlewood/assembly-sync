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
import { Order, BlankOrder } from "@/lib/types"
import { isNumber } from "@/lib/utils"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { setDoc, doc } from "@firebase/firestore";
import { db } from "@/firebase/config"


const ErrorLabel = ({children, id, errorInfo}:{children:string,id:string, errorInfo:string[]}) => {

  return (
    <>
      {errorInfo.includes(id) && <p className="text-red-500 text-right pr-6">
        <i>{children}</i>
      </p>}
    </>
  )
}

export function NewOrderDialog() {
  const [newOrder, setNewOrder] = useState<Order>(BlankOrder);
  const [open, setOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string[]>([]);

  const validateOrder = () => {
    let successful = true;
    setErrorInfo([]);
    if (newOrder.workOrder === '') {
      setErrorInfo(errorInfo => [...errorInfo, 'workOrder']);
      successful = false;
    }
    setHasError(successful)
    return successful;
  }
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    if (id === 'quantity') {
      isNumber(value) && setNewOrder({ ...newOrder, quantity: { total: Number(value), completed: 0 } });
      value === '' && setNewOrder({ ...newOrder, quantity: { total: "", completed: 0 } });
    } else if(id === 'saleOrder') {
      isNumber(value) && setNewOrder({ ...newOrder, [id]: Number(value) });
      value === '' && setNewOrder({ ...newOrder, [id]: value });
    } else {
      setNewOrder({ ...newOrder, [id]: value });
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateOrder()) {
      try {
        await setDoc(doc(db, "Orders", newOrder.workOrder), newOrder).then(()=> setOpen(false));
      } catch (error) {
        setHasError(true);
        console.log(error);
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className=' hover:text-accent-foreground hover:bg-accent relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>New Order</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New Order</DialogTitle>
            <DialogDescription>
              Add a new order to the schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workOrder" className="text-right">
                Work Order
              </Label>
              <Input id="workOrder" className="col-span-3" value={newOrder.workOrder}
            onChange={handleInput}/>
            </div>
            <ErrorLabel id={'workOrder'} errorInfo={errorInfo} >Work order can not be blank</ErrorLabel>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="saleOrder" className="text-right">
                Sale Order
              </Label>
              <Input id="saleOrder" className="col-span-3" value={newOrder.saleOrder}
            onChange={handleInput}/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerName" className="text-right">
                Customer Name
              </Label>
              <Input id="customerName" className="col-span-3" value={newOrder.customerName}
                onChange={handleInput}/>
            </div>
            {/* TODO: convert to dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product" className="text-right">
                Product
              </Label>
              <Input id="product" className="col-span-3" value={newOrder.product}
                onChange={handleInput}/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity.total" className="text-right">
                Quantity
              </Label>
              <Input id="quantity" className="col-span-3" value={newOrder.quantity.total}
                onChange={handleInput} />
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
