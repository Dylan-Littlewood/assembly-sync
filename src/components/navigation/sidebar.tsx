import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { CalendarClock, LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-4 items-center p-4">
          <Link to={'/Dashboard'}><Button variant={'ghost'} size={'sq'}><LayoutDashboard className="h-8 w-8" /></Button></Link>
          <Link to={'/Schedule'}><Button variant={'ghost'} size={'sq'}><CalendarClock className="h-8 w-8" /></Button></Link>
        </div>
  )
}
