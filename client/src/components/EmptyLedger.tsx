import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmptyLedger: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-8 mt-12 text-center bg-brand-100/30 rounded-[20px] border border-brand-100 border-dashed">
      <div className="w-20 h-20 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
      </div>
      <h2 className="text-brand-900 font-bold text-xl leading-tight">Your Ledger is Empty</h2>
      <p className="text-gray-500 text-sm mt-2 mb-6">Start by verifying a customer and recording their first debt.</p>
      
      <button 
        onClick={() => navigate('/verify')}
        className="btn-primary"
      >
        Verify New Customer
      </button>
    </div>
  );
};

export default EmptyLedger;
