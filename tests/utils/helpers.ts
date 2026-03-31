/**
 * Helper Functions - Utilities for tests
 */

export function extractPrice(priceString: string): number {
  const numericValue = priceString.replace(/[^\d.-]/g, '');
  return parseFloat(numericValue);
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function generateRandomEmail(): string {
  const timestamp = Date.now();
  return `testuser${timestamp}@example.com`;
}

export function generateRandomPhone(): string {
  const randomNum = Math.floor(Math.random() * 9000000000) + 1000000000;
  return randomNum.toString();
}

export async function waitSeconds(seconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

export function calculateDiscountPercentage(originalPrice: number, discountedPrice: number): number {
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount);
}

export function generateOrderId(): string {
  const prefix = 'ORD';
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}${timestamp}${random}`;
}