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
import { ErrorType, OrderUpdate, Product } from "@/lib/types"
import { isNumber } from "@/lib/utils"
import { Pencil, PlusCircle } from "lucide-react"
import { useState } from "react"
import InputField from "./ui/inputField"
import { updateOrder } from "@/firebase/firestore"


const products: Product[] = [
  {
    sku: "FLMI",
    name: "Flex Mini",
  },
  {
    sku: "ASPMI-H610M-E",
    name: "Aspect Mini",
  },
  {
    sku: "FLAIO",
    name: "FLAIO",
  },
  {
    sku: "ASPAIO",
    name: "ASPAIO",
  },
]

export function EditOrderDialog({workOrder}:{workOrder: OrderUpdate}) {
  const [order, setOrder] = useState<OrderUpdate>(workOrder);
  const [open, setOpen] = useState(false);
  const [errorInfo, setErrorInfo] = useState<ErrorType[]>([{}]);


  const validateOrder = () => {
    let successful = true;
    let error = {message:'test'};
    setErrorInfo([{}]);
    if (order.customerName === '') {
      setErrorInfo(errorInfo => [...errorInfo, {id:'customerName',message:'Customer can not be blank'}]);
      successful = false;
    }
    if (order.product?.name === '') {
      setErrorInfo(errorInfo => [...errorInfo, {id:'product',message:'Product can not be blank'}]);
      successful = false;
    }
    if (order.quantity?.total === '') {
      setErrorInfo(errorInfo => [...errorInfo, {id:'quantity',message:'quantity can not be blank'}]);
      successful = false;
    }
    if (order.saleOrder === '') {
      setErrorInfo(errorInfo => [...errorInfo, {id:'saleOrder',message:'Sale order can not be blank'}]);
      successful = false;
    }
    return successful;
  }
  const handleInput = (id:string, value:string) => {

    setErrorInfo(errorInfo.filter(error => error.id !== id));

    if (id === 'quantity') {
      isNumber(value) && setOrder({ ...order, quantity: { total: Number(value), completed: 0 } });
      value === '' && setOrder({ ...order, quantity: { total: "", completed: 0 } });
    } else if(id === 'saleOrder') {
      isNumber(value) && setOrder({ ...order, [id]: Number(value) });
      value === '' && setOrder({ ...order, [id]: value });
    } else if(id === 'product') {
      setOrder({ ...order, [id]: products.find(productRef => productRef.sku.toLowerCase() === value.toLowerCase()) });
    } else {
      setOrder({ ...order, [id]: value });
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (order.workOrder && validateOrder()) {
      updateOrder(order.workOrder, order).then(() => dialogOnOpen(false));
    }
  }

  const dialogOnOpen = (shouldOpen: boolean) => {
    setErrorInfo([{}]);
    setOpen(shouldOpen);
  }

  return (
    <Dialog open={open} onOpenChange={dialogOnOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size='sm'><Pencil /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{order.workOrder ? order.workOrder : 'Error ID Not Found'}</DialogTitle>
            <DialogDescription className="pb-4">
              Add a new order to the schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <InputField id="saleOrder" onChange={handleInput} value={order.saleOrder ? order.saleOrder : ''} errorInfo={errorInfo}>
              Sale Order
            </InputField>
            <InputField id="customerName" onChange={handleInput} value={order.customerName ? order.customerName : ''} errorInfo={errorInfo}>
              Customer Name
            </InputField>
            <InputField id="quantity" onChange={handleInput} value={order.quantity?.total ? order.quantity?.total : ''} errorInfo={errorInfo}>
              Quantity
            </InputField>
            <InputField id="product" onChange={handleInput} value={order.product?.sku ? order.product.sku : ''} errorInfo={errorInfo}>
              Product
            </InputField>
          </div>
          <DialogFooter>
            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
