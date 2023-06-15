import { Order } from "./types";

export const mockData: Order[] = [
  {
    status: "Complete",
    workOrder: "WO2382",
    saleOrder: 35682,
    customerName: "The PC Factory",
    product: "FLM",
    quantity: {
      total: 50,
      completed: 50,
    },
    assigned: ["tdu21AGVZtGsyHUGfaKiL4bzCEaO", "EewaXC9kXW1z1wjFXtR7HLODhSdZ"],
  },
  {
    status: "Processing",
    workOrder: "WO2194",
    saleOrder: 40521,
    customerName: "Bluebell Wood School",
    product: "ASPS",
    quantity: {
      total: 200,
      completed: 27,
    },
    assigned: ["EewaXC9kXW1z1wjFXtR7HLODhSdZ", "testid3", "tdu21AGVZtGsyHUGfaKiL4bzCEaO"],
  },
  {
    status: "Picking",
    workOrder: "WO3168",
    saleOrder: 40762,
    customerName: "Creative Hut",
    product: "ARENA",
    quantity: {
      total: 2,
      completed: 0,
    },
    assigned: [],
  },
  {
    status: "Issue",
    workOrder: "WO3169",
    saleOrder: 40762,
    customerName: "Creative Hut",
    product: "ARENA",
    quantity: {
      total: 1,
      completed: 0,
    },
    assigned: [],
  },
  // ...
];

