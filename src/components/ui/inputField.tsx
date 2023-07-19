import { ErrorLabel } from "@/error-page";
import { Input } from "./input";
import { Label } from "./label";
import { ErrorType } from "@/lib/types";
import { ComboboxDemo } from "./combobox";
import { cn } from "@/lib/utils";

export default function InputField({ children, id, onChange, value, errorInfo }: { children: string, id: string, onChange: (id:string, value:string) => void, value: string | number, errorInfo: ErrorType[] }) {
  const error = errorInfo.find((error) => { return error.id === id })
  const errorClass = error ? 'ring-1 ring-red-500' : '';
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={id} className="text-right">
          {children}
        </Label>
        {id === 'product' ? <ComboboxDemo className={errorClass} value={value as string} onChange={onChange} /> : <Input id={id} className={cn("col-span-3",errorClass)} value={value} onChange={(e)=>{ onChange(e.target.id,e.target.value)}}/>}
      </div>
      <ErrorLabel id={id} errorInfo={errorInfo} />
    </>
  )
}
