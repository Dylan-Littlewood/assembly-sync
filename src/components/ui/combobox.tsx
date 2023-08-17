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
import { loadProducts } from "@/firebase/firestore"


export function ProductCombobox({product,onChange, className}:{product:string, onChange: (id:string, value:string) => void, className: string}) {
  const [open, setOpen] = React.useState(false)
  const products = loadProducts();

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
          {product
            ? products.find((productRef) => productRef.sku.toLowerCase() === product.toLowerCase())?.name
            : "Select Product..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search Product..." />
          <CommandEmpty>No product found.</CommandEmpty>
          <CommandGroup>
            {products.map((productRef) => (
              <CommandItem
                key={productRef.sku}
                onSelect={(currentValue) => {
                  onChange("product", currentValue === productRef.sku ? "" : currentValue)
                  setOpen(false)
                }}
                value={productRef.sku}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    product === productRef.sku ? "opacity-100" : "opacity-0"
                  )}
                />
                {productRef.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
