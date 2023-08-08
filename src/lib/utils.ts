import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Timestamp } from "@firebase/firestore"
import { faker } from '@faker-js/faker';
import { Order } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getInitials(name: string) {
  var parts = name.split(' ');
  var initials = '';
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].length > 0 && parts[i] !== '') {
      initials += parts[i][0];
    }
  }
  return initials;
}

export function generateOrder(): Order {
  return {
    customerName: faker.company.name(),
    status: 'New',
    saleOrder: faker.number.int({ min: 10000, max: 99999 }),
    workOrder: `WO${faker.number.int({ min: 1000, max: 9999 })}`,
    product: {
      name: "Flex Slim",
      sku: "FLS",
      buildTimeMinutes: 15,
    },
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

export function isNumber(input: string) {
  if (input === '') return false;
  const val = Number(input);
  return Number.isInteger(val);
}

export function isToday(date: Timestamp | undefined) {
// Get today's date
  var todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);

  return datesMatch(date, todaysDate);

}

export function datesMatch(date1: Timestamp|undefined, date2:Timestamp|undefined): boolean;
export function datesMatch(date1: Timestamp|undefined, date2:Date|undefined): boolean;
export function datesMatch(date1: Date|undefined, date2:Timestamp|undefined): boolean;
export function datesMatch(date1: Date|undefined, date2:Date|undefined): boolean;

export function datesMatch(date1: any, date2: any) {
  if (!date1 || !date2) return false;
  let timestamp1 = date1;
  let timestamp2 = date2;
  if (!(date1 instanceof Timestamp)) {
    timestamp1 = Timestamp.fromDate(date1)
  }
  if (!(date2 instanceof Timestamp)) {
    timestamp2 = Timestamp.fromDate(date2)
  }
  return timestamp1.isEqual(timestamp2);
}
