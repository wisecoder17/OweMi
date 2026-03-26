import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { debtApi } from '../lib/api';
import { Debt } from '../types';
import StatusBadge from '../components/StatusBadge';

export const DebtPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [debt, setDebt] = useState<Debt | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchDebtDetail = async () => {
      try {
        const res = await debtApi.list();
        const found = res.data.debts.find((d: Debt) => d.id === id);
        setDebt(found);
      } catch (err) {
        console.error('Failed to fetch debt:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDebtDetail();
  }, [id]);

  const handleMarkPaid = async () => {
    if (!id || !debt) return;
    setUpdating(true);
    try {
      await debtApi.updateStatus(id, 'paid');
      navigate('/');
    } catch (err) {
      console.error('Update Debt Status Error:', err);
      alert('Failed to update. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse">Loading record...</div>;
  if (!debt) return <div className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest leading-loose">Record not found.</div>;

  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(debt.amount);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-6 duration-400">
      <div className="flex flex-col items-center text-center mt-4">
        <img 
          src={debt.customerPhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${debt.customerName}`} 
          alt={debt.customerName}
          className="w-20 h-20 rounded-full bg-brand-100 border-4 border-white shadow-sm"
        />
        <h1 className="text-2xl font-bold text-gray-900 mt-3">{debt.customerName}</h1>
        <StatusBadge status={debt.status} />
      </div>

      <div className="card text-center py-10 flex flex-col gap-2">
         <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Outstanding Balance</span>
         <div className="text-[48px] font-black text-brand-900 leading-tight">
           {formattedAmount}
         </div>
      </div>

      <div className="flex flex-col gap-4 px-2">
         <div className="flex justify-between items-center border-b border-gray-100 py-3">
            <span className="text-gray-500 font-medium">Recorded for</span>
            <span className="text-gray-900 font-bold">{debt.item || 'Generic Item'}</span>
         </div>
         <div className="flex justify-between items-center border-b border-gray-100 py-3">
            <span className="text-gray-500 font-medium">Recorded on</span>
            <span className="text-gray-900 font-bold">{new Date(debt.recordedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
         </div>
         <div className="flex justify-between items-center border-b border-gray-100 py-3">
            <span className="text-gray-500 font-medium">Due Date</span>
            <span className="text-gray-900 font-bold text-status-red">{new Date(debt.dueDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
         </div>
      </div>

      {debt.status !== 'paid' && (
        <div className="bottom-cta p-4 flex flex-col gap-3">
          <button 
            onClick={handleMarkPaid}
            disabled={updating}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Mark as Fully Paid
          </button>
          <button 
             onClick={() => navigate('/')} 
             className="text-gray-400 font-bold text-xs uppercase tracking-widest p-2 hover:text-gray-600 active:scale-95 transition-all"
          >
            Dismiss for now
          </button>
        </div>
      )}
    </div>
  );
};
