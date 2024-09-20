import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names conditionally and merges Tailwind CSS classes, removing duplicates.
 *
 * @param {...ClassValue[]} inputs - A list of class name values that can include strings, arrays, or objects.
 * @returns {string} A string containing the combined and merged class names.
 */

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
