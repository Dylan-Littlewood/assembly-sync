import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Timestamp } from "@firebase/firestore"

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

export function isNumber(input: string) {
  if (input === '') return false;
  const val = Number(input);
  return Number.isInteger(val);
}

export function isToday(date: Timestamp | undefined) {
  if (!date) return false;

// Get today's date
  var todaysDate = new Date();
  var convertedDate = date.toDate();

// call setHours to take the time out of the comparison
  return convertedDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0);
}