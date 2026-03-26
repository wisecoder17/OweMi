import React from 'react';
import StatusBadge from './StatusBadge';
import { Debt } from '../types';

interface DebtorRowProps {
  debt: Debt;
  onClick: (id: string) => void;
}

const DebtorRow: React.FC<DebtorRowProps> = ({ debt, onClick }) => {
  // Localized date
  const dateStr = new Date(debt.recordedAt).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
  });

  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(debt.amount);

  return (
    <div 
      onClick={() => onClick(debt.id)}
      className="card flex items-center justify-between gap-4 active:bg-gray-100/50 transition-colors p-3"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <img 
          src={debt.customerPhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${debt.customerName}`} 
          alt={debt.customerName}
          className="w-10 h-10 rounded-full bg-brand-100 flex-shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-[14px] font-bold text-gray-900 truncate">
            {debt.customerName}
          </span>
          <span className="text-[12px] text-gray-500 font-medium">
            {debt.item || 'Generic Credit'} • {dateStr}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <span className="text-[14px] font-extrabold text-brand-900">
          {formattedAmount}
        </span>
        <StatusBadge status={debt.status} />
      </div>
    </div>
  );
};

export default DebtorRow;
