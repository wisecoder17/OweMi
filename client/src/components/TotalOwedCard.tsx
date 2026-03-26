import React from 'react';

interface TotalOwedCardProps {
  amount: number;
  overdueCount: number;
  totalDebtors: number;
}

const TotalOwedCard: React.FC<TotalOwedCardProps> = ({ amount, overdueCount, totalDebtors }) => {
  // Format amount as Naira (standard for OweMi)
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);

  return (
    <div className="bg-brand-900 text-white p-5 rounded-[16px] shadow-lg relative overflow-hidden flex flex-col gap-3">
      {/* Subtle background decoration for "premium" feel */}
      <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-brand-600 opacity-20 rounded-full blur-2xl"></div>
      
      <div>
        <label className="text-brand-100/70 text-[11px] font-bold uppercase tracking-wider">
          Total Outstanding Credit
        </label>
        <h1 className="text-3xl font-bold leading-none mt-1">
          {formattedAmount}
        </h1>
      </div>

      <div className="flex items-center gap-4 border-t border-brand-600/30 pt-3 mt-1">
        <div className="flex flex-col">
          <span className="text-[10px] text-brand-100/60 uppercase font-bold tracking-tight">Overdue</span>
          <span className={`text-sm font-bold ${overdueCount > 0 ? 'text-status-amber' : 'text-white'}`}>
            {overdueCount} {overdueCount === 1 ? 'Customer' : 'Customers'}
          </span>
        </div>
        
        <div className="h-6 w-[1px] bg-brand-600/30"></div>

        <div className="flex flex-col">
          <span className="text-[10px] text-brand-100/60 uppercase font-bold tracking-tight">Total Debtors</span>
          <span className="text-sm font-bold text-white">
            {totalDebtors}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalOwedCard;
