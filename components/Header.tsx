
import React from 'react';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onReset}>
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Lumina<span className="text-indigo-600">PDF</span></h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onReset}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
        >
          New Document
        </button>
        <div className="h-6 w-px bg-slate-200"></div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-medium text-slate-500">Gemini 3 Pro</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
