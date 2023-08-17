import { AlertCircle, CreditCard, LogOut, PlusCircle, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FC, useContext } from "react";
import { getInitials } from "@/lib/utils";
import { auth } from "@/firebase/config";
import { getEmployee, loadEmployees } from "@/firebase/firestore";
import { AuthContext } from "@/context/AuthContext";
import { addOrder, addProducts } from "@/lib/dev";

interface EmployeeID {
  employeeID: string;
}

export const UserNav: FC<EmployeeID> = ({ employeeID }): JSX.Element => {
  const employee = getEmployee(loadEmployees(), employeeID);

  const {dispatch} = useContext(AuthContext)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={employee.img} alt="@shadcn" />
            {employee.name === "User Not Found" ? (
              <AvatarFallback className=" bg-red-200">
                <AlertCircle color="red" />
              </AvatarFallback>
            ) : (
              <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{employee.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{employee.role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {
            addOrder();
          }}>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Add Order</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {
            addProducts();
          }}>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Add Products</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            auth.signOut().then(() => {
              if (dispatch) { dispatch({ type: "LOGOUT", payload: null }) }
            });
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
