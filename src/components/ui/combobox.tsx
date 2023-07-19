"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const products = [
  {
    value: "FLMI",
    label: "Flex Mini",
  },
  {
    value: "ASPMI-H610M-E",
    label: "Aspect Mini",
  },
  {
    value: "FLAIO",
    label: "FLAIO",
  },
  {
    value: "ASPAIO",
    label: "ASPAIO",
  },
]

export function ComboboxDemo({value,onChange, className}:{value:string, onChange: (id:string, value:string) => void, className: string}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id='product'
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("col-span-3 justify-between",className)}
        >
          {value
            ? products.find((product) => product.value.toLowerCase() === value)?.label
            : "Select Product..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search Product..." />
          <CommandEmpty>No product found.</CommandEmpty>
          <CommandGroup>
            {products.map((product) => (
              <CommandItem
                key={product.value}
                onSelect={(currentValue) => {
                  onChange("product", currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
                value={product.value}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === product.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {product.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
