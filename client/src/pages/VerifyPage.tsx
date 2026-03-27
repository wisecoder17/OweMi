import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerApi } from '../lib/api';

/**
 * VerifyPage handles the entry of customer identity (BVN/NIN).
 * High-impact, simple mobile interface.
 */

export const VerifyPage: React.FC = () => {
  const [bvn, setBvn] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bvn.length !== 11) {
      setError('BVN must be 11 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await customerApi.verify({ type: 'BVN', value: bvn });
      // Store result in location state for simplicity (or global state later)
      navigate('/result', { state: { customer: res.data } });
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Verification failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="mt-8">
        <h1 className="text-gray-900 font-bold text-3xl leading-tight">Identity Check</h1>
        <p className="text-gray-500 font-medium mt-2">Enter the customer's BVN to secure the credit record.</p>
      </div>

      <form onSubmit={handleVerify} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold text-gray-500 uppercase tracking-widest pl-1">
            Bank Verification Number (BVN)
          </label>
          <div className="relative">
            <input 
              type="tel" 
              maxLength={11}
              value={bvn}
              onChange={(e) => setBvn(e.target.value.replace(/\D/g, ''))}
              placeholder="01234567891"
              className={`w-full h-[64px] bg-gray-50 border-2 rounded-[16px] px-6 text-2xl font-bold tracking-[0.2em] outline-none transition-all
                ${error ? 'border-status-red' : 'border-gray-100 focus:border-brand-600 focus:bg-white'}
              `}
            />
            {loading && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <div className="w-6 h-6 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          {error && <span className="text-status-red text-xs font-bold pl-1">{error}</span>}
        </div>

        <div className="mt-4 flex flex-col gap-3">
           <div className="p-4 bg-brand-100/50 rounded-[12px] border border-brand-100 flex items-start gap-3">
             <div className="text-brand-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
             </div>
             <p className="text-gray-600 text-[13px] leading-tight font-medium">
               BVN is used only for identity and credit history verification through Interswitch secure rails.
             </p>
           </div>
        </div>

        <div className="bottom-cta">
          <button 
            type="submit"
            disabled={bvn.length !== 11 || loading}
            className="btn-primary"
          >
            {loading ? 'Confirming Identity...' : 'Confirm Customer'}
          </button>
        </div>
      </form>

      {/* Quick shortcuts for Demo (Help Richard test faster) */}
      <div className="mt-auto pb-24 text-center">
         <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Demo Shortcuts</span>
          <div className="flex gap-2 justify-center mt-2 flex-wrap">
             <button onClick={() => setBvn('11122233344')} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded font-bold">EMEK (GOOD)</button>
             <button onClick={() => setBvn('22233344455')} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded font-bold">TUND (NEW)</button>
             <button onClick={() => setBvn('33344455566')} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded font-bold">OBIN (RISK)</button>
             <button onClick={() => setBvn('00000000000')} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded font-bold">FAIL</button>
          </div>
      </div>
    </div>
  );
};
