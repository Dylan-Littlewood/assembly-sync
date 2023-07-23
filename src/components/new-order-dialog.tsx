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
import { Timestamp } from "@firebase/firestore"
import { Order, BlankOrder, ErrorType } from "@/lib/types"
import { isNumber } from "@/lib/utils"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { setDoc, doc } from "@firebase/firestore";
import { db } from "@/firebase/config"
import InputField from "./ui/inputField"


export function NewOrderDialog() {
  const [newOrder, setNewOrder] = useState<Order>(BlankOrder);
  const [open, setOpen] = useState(false);
  const [errorInfo, setErrorInfo] = useState<ErrorType[]>([{}]);


  const isWOValid = (error:{message:string}) => {
    if (newOrder.workOrder === '') {
      error.message = 'Work order can not be blank';
      return false;
    }
    if (!newOrder.workOrder.startsWith("WO")) {
      error.message = "work order must start with 'WO'"
      return false;
    }
    const woNumber = newOrder.workOrder.substring(2);
    if (!isNumber(woNumber)) {
      error.message = "Work order must be a number after 'WO'"
      return false;
    }
    return true;
  }

  const validateOrder = () => {
    let successful = true;
    let error = {message:'test'};
    setErrorInfo([{}]);
    if (!isWOValid(error)) {
      setErrorInfo(errorInfo => [...errorInfo, {id:'workOrder',message:error.message}]);
      successful = false;
    }
    if (newOrder.customerName === '') {
      setErrorInfo(errorInfo => [...errorInfo, {id:'customerName',message:'Customer can not be blank'}]);
      successful = false;
    }
    if (newOrder.product === '') {
      setErrorInfo(errorInfo => [...errorInfo, {id:'product',message:'Product can not be blank'}]);
      successful = false;
    }
    if (newOrder.quantity.total === '') {
      setErrorInfo(errorInfo => [...errorInfo, {id:'quantity',message:'quantity can not be blank'}]);
      successful = false;
    }
    if (newOrder.saleOrder === '') {
      setErrorInfo(errorInfo => [...errorInfo, {id:'saleOrder',message:'Sale order can not be blank'}]);
      successful = false;
    }
    return successful;
  }
  const handleInput = (id:string, value:string) => {

    setErrorInfo(errorInfo.filter(error => error.id !== id));

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
      console.log(newOrder);
      try {
        await setDoc(doc(db, "Orders", newOrder.workOrder), newOrder).then(()=> dialogOnOpen(false));
      } catch (error) {
        console.log(error);
      }
    }
  }

  const dialogOnOpen = (shouldOpen: boolean) => {
    setErrorInfo([{}]);
    setOpen(shouldOpen);
  }

  return (
    <Dialog open={open} onOpenChange={dialogOnOpen}>
      <DialogTrigger asChild>
        <Button >
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>New Order</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New Order</DialogTitle>
            <DialogDescription className="pb-4">
              Add a new order to the schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <InputField id="workOrder" onChange={handleInput} value={newOrder.workOrder} errorInfo={errorInfo}>
              Work Order
            </InputField>
            <InputField id="saleOrder" onChange={handleInput} value={newOrder.saleOrder} errorInfo={errorInfo}>
              Sale Order
            </InputField>
            <InputField id="customerName" onChange={handleInput} value={newOrder.customerName} errorInfo={errorInfo}>
              Customer Name
            </InputField>
            <InputField id="quantity" onChange={handleInput} value={newOrder.quantity.total} errorInfo={errorInfo}>
              Quantity
            </InputField>
            <InputField id="product" onChange={handleInput} value={newOrder.product} errorInfo={errorInfo}>
              Product
            </InputField>
          </div>
          <DialogFooter>
            <Button type="submit">Submit Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
