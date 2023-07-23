import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "../ui/badge"
import { Order } from "@/lib/types"

export function OrderCard({order}:{order:Order}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Customer Name</CardTitle>
        <CardDescription>Aspect Micro</CardDescription>
        <div>
          <Badge>New</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Work Order
            </p>
            <p className="text-sm text-muted-foreground">
              WO2451
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Sale Order
            </p>
            <p className="text-sm text-muted-foreground">
              34585
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Quantity
            </p>
            <p className="text-sm text-muted-foreground">
              45
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive">Delete</Button>
        <Button variant="outline">Schedule</Button>
        <Button variant="outline">Edit</Button>
      </CardFooter>
    </Card>
  )
}
