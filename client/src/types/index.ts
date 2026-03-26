export interface Customer {
  id: string;
  name: string;
  photoUrl: string;
  phoneMasked: string;
  dob: string;
  verificationType: 'BVN' | 'NIN';
  identityConfirmed: boolean;
  creditStatus: {
    hasHistory: boolean;
    signal: 'good' | 'caution' | 'risk' | 'none';
    score: number | null;
    summary: string;
  };
}

export interface Debt {
  id: string;
  customerName: string;
  customerPhoto: string;
  amount: number;
  item: string;
  dueDate: string;
  recordedAt: string;
  status: 'unpaid' | 'paid' | 'overdue';
}

export interface LedgerSummary {
  totalOutstanding: number;
  unpaidCount: number;
  overdueCount: number;
  debts: Debt[];
}

export interface VerifyResponse extends Customer {
  customerId: string;
  message: string;
}
