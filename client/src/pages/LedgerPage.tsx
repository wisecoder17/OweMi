import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debtApi } from '../lib/api';
import { LedgerSummary } from '../types';
import TotalOwedCard from '../components/TotalOwedCard';
import DebtorRow from '../components/DebtorRow';
import EmptyLedger from '../components/EmptyLedger';

export const LedgerPage: React.FC = () => {
  const [data, setData] = useState<LedgerSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const res = await debtApi.list();
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch ledger:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLedger();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 animate-pulse">
        <div className="w-12 h-12 bg-brand-100 rounded-full"></div>
      </div>
    );
  }

  const isEmpty = !data || data.debts.length === 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Header section with CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 font-bold text-2xl">Ledger</h2>
          <p className="text-gray-500 text-sm font-medium">Informal loan tracking</p>
        </div>
        <button 
          onClick={() => navigate('/verify')}
          className="bg-brand-600/10 text-brand-600 px-4 py-2 rounded-full font-bold text-sm h-10 border border-brand-600/20 active:scale-95 transition-all"
        >
          + New Debt
        </button>
      </div>

      {!isEmpty && (
        <TotalOwedCard 
          amount={data.totalOutstanding} 
          overdueCount={data.overdueCount} 
          totalDebtors={data.debts.length}
        />
      )}

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-[12px] font-bold text-gray-500 uppercase tracking-widest pl-1">
          Active Records
        </label>
        
        {isEmpty ? (
          <EmptyLedger />
        ) : (
          <div className="flex flex-col gap-3">
            {data.debts.map((debt) => (
              <DebtorRow 
                key={debt.id} 
                debt={debt} 
                onClick={(id) => navigate(`/debts/${id}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button for mobile-first speed (optional) */}
      {!isEmpty && (
        <div className="bottom-cta">
          <button 
            onClick={() => navigate('/verify')}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            Verify New Customer
          </button>
        </div>
      )}
    </div>
  );
};
