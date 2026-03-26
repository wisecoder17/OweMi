import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-gray-100 py-3 px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
          O
        </div>
        <span className="text-brand-900 font-bold text-xl tracking-tight italic">OweMi</span>
      </div>
      
      {!isHome && (
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-500 font-medium text-sm flex items-center gap-1 active:opacity-60"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back
        </button>
      )}
    </header>
  );
};

export default TopBar;
