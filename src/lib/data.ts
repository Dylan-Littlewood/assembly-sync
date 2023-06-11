import { Order, Employee } from "./types";
import DylanLittlewoodImgUrl from "@/assets/Dylan-Littlewood.png";
import shadcnImgUrl from "@/assets/shadcn.png";

export const mockData: Order[] = [
  {
    id: "728ed52f",
    status: "Complete",
    workOrder: "WO2382",
    saleOrder: 35682,
    customerName: "The PC Factory",
    product: "FLM",
    Quantity: {
      total: 50,
      completed: 50,
    },
    assigned: ["testid2", "qyuQU8r8VwNszEHdd3cv711FGAH2"],
  },
  {
    id: "489e1d42",
    status: "Processing",
    workOrder: "WO2194",
    saleOrder: 40521,
    customerName: "Bluebell Wood School",
    product: "ASPS",
    Quantity: {
      total: 200,
      completed: 27,
    },
    assigned: ["qyuQU8r8VwNszEHdd3cv711FGAH2", "testid3", "testid4"],
  },
  {
    id: "48tshgs1d42",
    status: "Picking",
    workOrder: "WO3168",
    saleOrder: 40762,
    customerName: "Creative Hut",
    product: "ARENA",
    Quantity: {
      total: 2,
      completed: 0,
    },
    assigned: [],
  },
  {
    id: "489etgsdrg",
    status: "Issue",
    workOrder: "WO3169",
    saleOrder: 40762,
    customerName: "Creative Hut",
    product: "ARENA",
    Quantity: {
      total: 1,
      completed: 0,
    },
    assigned: [],
  },
  // ...
];

export const mockUsers: Employee[] = [
  {
    id: "mS5cUiGMFifJu7zcVDptqTN1ubN2",
    name: "Dylan Littlewood",
    img: DylanLittlewoodImgUrl,
    role: "Senior Production Technician",
  },
  {
    id: "testid2",
    name: "shadcn",
    img: shadcnImgUrl,
    role: "Temp Staff",
  },
  {
    id: "testid3",
    name: "Ben Wall",
    img: "",
    role: "Senior Production Technician",
  },
];
