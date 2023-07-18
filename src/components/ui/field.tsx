import { ErrorLabel } from "@/error-page";
import { Input } from "./input";
import { Label } from "./label";
import { ErrorType } from "@/lib/types";

export default function InputField({ children, id, onChange, value, errorInfo }: { children: string, id: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, value: string | number, errorInfo: ErrorType[] }) {
  const error = errorInfo.find((error) => { return error.id === id })
  const errorClass = error ? 'col-span-3 ring-1 ring-red-500' : 'col-span-3';
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={id} className="text-right">
          {children}
        </Label>
        <Input id={id} className={errorClass} value={value} onChange={onChange}/>
      </div>
      <ErrorLabel id={id} errorInfo={errorInfo} />
    </>
  )
}
