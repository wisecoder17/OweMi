export interface Customer {
  id: string;
  name: string;
  photoUrl: string;
  phoneMasked: string;
  dob: string;
  verificationType: 'BVN' | 'NIN';
  identityConfirmed: boolean;
  credit: {
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

export interface VerifyResponse {
  customerId: string;
  identity: {
    confirmed: boolean;
    name: string;
    photoUrl: string;
    phoneMasked: string;
    dob: string;
    verificationType: 'BVN' | 'NIN';
  };
  credit: {
    hasHistory: boolean;
    signal: 'good' | 'caution' | 'risk' | 'none';
    score: number | null;
    summary: string;
  };
  message: string;
}
