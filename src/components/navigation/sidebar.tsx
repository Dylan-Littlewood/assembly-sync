import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { CalendarClock, ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex flex-col gap-4 p-4">
      <Button variant={'ghost'} size={'sq'} align={'start'} onClick={() => { setIsOpen(!isOpen) } }>{isOpen ? <ChevronLeft className="h-8 w-8" /> : <ChevronRight className="h-8 w-8" />}{isOpen && <h2 className="ml-4">Close</h2>}</Button>
      <NavLink to={'/Dashboard'} className={({isActive}) => isActive ? "w-full bg-primary/10 rounded-lg" : "w-full"}><Button variant={'ghost'} size={'sq'} align={'start'}><LayoutDashboard className="h-8 w-8" />{isOpen && <h2 className="ml-4">Dashboard</h2>}</Button></NavLink>
      <NavLink to={'/Schedule'} className={({isActive}) => isActive ? "w-full bg-primary/10 rounded-lg" : "w-full"}><Button variant={'ghost'} size={'sq'} align={'start'}><CalendarClock className="h-8 w-8" />{isOpen && <h2 className="ml-4">Schedule</h2>}</Button></NavLink>
    </div>
  )
}
