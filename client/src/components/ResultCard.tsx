import React from 'react';
import { Customer } from '../types';

interface ResultCardProps {
  customer: Customer;
  onContinue: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ customer, onContinue }) => {
  const signalColors = {
    good: { bg: 'bg-brand-500', text: 'text-white', label: 'Recommended' },
    caution: { bg: 'bg-status-amber', text: 'text-white', label: 'Caution' },
    risk: { bg: 'bg-status-red', text: 'text-white', label: 'High Risk' },
    none: { bg: 'bg-gray-400', text: 'text-white', label: 'No History' }
  };

  const { bg, label } = signalColors[customer.creditStatus.signal] || signalColors.none;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Identity Profile */}
      <div className="card flex flex-col items-center p-8 gap-4 text-center">
        <div className="relative">
          <img 
            src={customer.photoUrl} 
            alt={customer.name}
            className="w-24 h-24 rounded-full border-4 border-brand-100 object-cover"
          />
          {customer.identityConfirmed && (
            <div className="absolute bottom-0 right-0 bg-brand-500 text-white p-1 rounded-full border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
          <p className="text-gray-500 font-medium">{customer.verificationType}: {customer.phoneMasked}</p>
        </div>

        <div className="flex items-center gap-2 bg-brand-100 text-brand-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Identity Confirmed
        </div>
      </div>

      {/* Credit Verdict (Theater Part) */}
      <div className="card overflow-hidden !p-0 border-2 border-brand-100">
        <div className={`${bg} p-4 text-center`}>
          <span className="text-white/80 text-[10px] uppercase font-black tracking-[0.2em]">OweMi Credit Verdict</span>
          <h2 className="text-white text-2xl font-black mt-1 uppercase">{label}</h2>
        </div>
        
        <div className="p-6 flex flex-col gap-4 text-center">
          {customer.creditStatus.score !== null && (
             <div className="flex flex-col items-center">
                <div className="text-[48px] font-black text-brand-900 leading-none">
                  {customer.creditStatus.score}%
                </div>
                <span className="text-gray-400 text-xs font-bold uppercase">Trust Score</span>
                
                {/* Visual Score Bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full mt-4 overflow-hidden max-w-[200px]">
                  <div 
                    className={`h-full ${bg} transition-all duration-1000`} 
                    style={{ width: `${customer.creditStatus.score}%` }}
                  ></div>
                </div>
             </div>
          )}

          <p className="text-gray-700 font-medium text-base">
            "{customer.creditStatus.summary}"
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="bottom-cta p-4 flex flex-col gap-3">
        <button 
          onClick={onContinue}
          className="btn-primary"
        >
          Proceed to Record Debt
        </button>
        <p className="text-gray-400 text-[11px] text-center px-4 leading-relaxed font-medium">
          OweMi is a trust helper. Final credit decisions remain with the trader.
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
