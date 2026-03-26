import React from 'react';

interface StatusBadgeProps {
  status: 'unpaid' | 'paid' | 'overdue';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    unpaid: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Unpaid' },
    paid: { bg: 'bg-brand-100', text: 'text-brand-600', label: 'Paid' },
    overdue: { bg: 'bg-status-red/10', text: 'text-status-red', label: 'Overdue' }
  };

  const { bg, text, label } = styles[status] || styles.unpaid;

  return (
    <span className={`status-badge ${bg} ${text} font-semibold uppercase tracking-wide text-[10px] px-2`}>
      {label}
    </span>
  );
};

export default StatusBadge;
