/**
 * Safe date parser that handles multiple formats, including DD/MM/YYYY common in Nigeria.
 */
export const parseSafeDate = (dateStr: any): Date | undefined => {
  if (!dateStr || typeof dateStr !== 'string') return undefined;
  
  // Try native parse first (handles YYYY-MM-DD, some MM/DD/YYYY)
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d;
  
  // Handle DD/MM/YYYY or DD-MM-YYYY
  const parts = dateStr.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (parts && parts[1] && parts[2] && parts[3]) {
    const day = parseInt(parts[1] as string, 10);
    const month = parseInt(parts[2] as string, 10) - 1; // 0-based
    const year = parseInt(parts[3] as string, 10);
    const complexDate = new Date(year, month, day);
    if (!isNaN(complexDate.getTime())) return complexDate;
  }
  
  return undefined;
};

/**
 * Currency formatter for NGN
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(amount);
};
