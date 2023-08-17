
import { db } from "@/firebase/config";
import { addProduct } from "@/firebase/firestore";
import { Order, Product } from "@/lib/types";
import { faker } from "@faker-js/faker";
import { setDoc, doc } from "@firebase/firestore";

const products: Product[] = [
  {
    sku: "FLMI",
    name: "Flex Mini",
  },
  {
    sku: "ASPMI-H610M-E",
    name: "Aspect Mini",
  },
  {
    sku: "FLAIO",
    name: "FLAIO",
  },
  {
    sku: "ASPAIO",
    name: "ASPAIO",
  },
]



export const addProducts = () => {
  products.map((product) => {
    addProduct(product);
  });
}

export const addOrder = async () => {
  const newOrder = generateOrder();
  try {
    await setDoc(doc(db, "Orders", newOrder.workOrder), newOrder);
  } catch (error) {
    console.log(error);
  }
}

function generateOrder(): Order {
  const randomProduct = products[faker.number.int({min:0,max:products.length - 1})];
  return {
    customerName: faker.company.name(),
    status: 'New',
    saleOrder: faker.number.int({ min: 10000, max: 99999 }),
    workOrder: `WO${faker.number.int({ min: 1000, max: 9999 })}`,
    product: randomProduct,
    quantity: {
      total: faker.number.int({min:1, max: 1000}),
      completed: 0,
    },
    dates: {
      scheduled: false
    },
    assigned: []
}
}