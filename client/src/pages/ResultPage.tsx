import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import { debtApi } from '../lib/api';
import { VerifyResponse } from '../types';

/**
 * ResultPage handles the post-verification flow.
 * Phase 1: Show the verdict (Trust Theater)
 * Phase 2: Show the simple debt recording form
 */

export const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const customer = location.state?.customer as VerifyResponse;

  const [step, setStep] = useState<'verdict' | 'record'>('verdict');
  const [amount, setAmount] = useState('');
  const [item, setItem] = useState('');
  const [loading, setLoading] = useState(false);

  // Helper to format numeric string with commas for display
  const formatAmountDisplay = (val: string) => {
    const numeric = val.replace(/\D/g, '');
    if (!numeric) return '';
    return new Intl.NumberFormat('en-US').format(Number(numeric));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setAmount(rawValue);
  };

  // Safeguard if accessed without state
  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
        <h2 className="text-gray-900 font-bold text-xl">No Customer Data</h2>
        <button onClick={() => navigate('/verify')} className="btn-primary mt-4">Start Over</button>
      </div>
    );
  }

  const handleRecordDebt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    setLoading(true);
    try {
      // Default due date: 7 days from now for MVP
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);

      await debtApi.create({
        customerId: customer.customerId,
        amount: Number(amount),
        item,
        dueDate: dueDate.toISOString(),
      });
      
      navigate('/');
    } catch (err) {
      console.error('Record Debt Error:', err);
      alert('Failed to record debt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'verdict') {
    return (
      <ResultCard 
        customer={customer} 
        onContinue={() => setStep('record')} 
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h1 className="text-gray-900 font-bold text-2xl">Record New Credit</h1>
        <p className="text-gray-500 font-medium">Adding credit for {customer.identity?.name || 'Customer'}</p>
      </div>

      <form onSubmit={handleRecordDebt} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold text-gray-500 uppercase tracking-widest pl-1">
            Credit Amount (₦)
          </label>
            <input 
              type="text" 
              autoFocus
              required
              placeholder="0"
              value={formatAmountDisplay(amount)}
              onChange={handleAmountChange}
              className="w-full h-16 bg-white border-2 border-gray-100 rounded-[16px] px-5 text-3xl font-extrabold focus:border-brand-600 outline-none transition-all"
            />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold text-gray-500 uppercase tracking-widest pl-1">
            Item / Reason
          </label>
          <input 
            type="text" 
            placeholder="e.g. 5kg Rice, Palm Oil"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="w-full h-14 bg-white border-2 border-gray-100 rounded-[16px] px-5 text-lg font-medium focus:border-brand-600 outline-none transition-all"
          />
        </div>

        <div className="p-4 bg-orange-50 rounded-[16px] border border-orange-100 flex items-start gap-3">
           <div className="text-amber-500 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
           </div>
           <p className="text-amber-700 text-[13px] leading-tight font-bold">
             Recording this will update your ledger balance instantly.
           </p>
        </div>

        <div className="bottom-cta">
          <button 
            type="submit" 
            disabled={loading || !amount}
            className="btn-primary"
          >
            {loading ? 'Recording...' : 'Save to Ledger'}
          </button>
        </div>
      </form>
    </div>
  );
};
