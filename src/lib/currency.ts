/**
 * Format currency in Bangladeshi Taka
 * @param amount - The amount to format
 * @param showSymbol - Whether to show the ৳ symbol (default: true)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, showSymbol: boolean = true): string {
  const formatted = new Intl.NumberFormat('bn-BD', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  
  return showSymbol ? `৳${formatted}` : formatted;
}

/**
 * Format currency range
 * @param min - Minimum amount
 * @param max - Maximum amount (optional)
 * @returns Formatted currency range string
 */
export function formatCurrencyRange(min: number, max?: number): string {
  if (max && max !== min) {
    return `৳${formatCurrency(min, false)} - ৳${formatCurrency(max, false)}`;
  }
  return `From ${formatCurrency(min)}`;
}

/**
 * Parse currency string to number
 * @param currencyString - Currency string like "৳500" or "500"
 * @returns Parsed number
 */
export function parseCurrency(currencyString: string): number {
  return parseInt(currencyString.replace(/[৳,\s]/g, ''), 10) || 0;
}

/**
 * Currency constants for Bangladesh
 */
export const CURRENCY = {
  symbol: '৳',
  code: 'BDT',
  name: 'Bangladeshi Taka',
  locale: 'bn-BD',
} as const;