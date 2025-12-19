
import React from 'react';
import { AnalysisResult, PdfFile } from '../types';

interface SidebarProps {
  pdf: PdfFile;
  analysis: AnalysisResult | null;
  onAskSuggested: (q: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ pdf, analysis, onAskSuggested }) => {
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <aside className="w-80 border-r border-slate-200 bg-white flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Active File</h3>
        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate" title={pdf.name}>
              {pdf.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{formatSize(pdf.size)}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        {analysis ? (
          <>
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Insights</h3>
              <ul className="space-y-3">
                {analysis.keyInsights.map((insight, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                    <span className="text-indigo-500 font-bold">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Ask Lumina</h3>
              <div className="space-y-2">
                {analysis.suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => onAskSuggested(q)}
                    className="w-full text-left text-xs p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 space-y-3 text-center">
            <div className="w-8 h-8 border-2 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 italic">Generating insights...</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
            JD
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-800">Free User</p>
            <p className="text-[10px] text-slate-500">3/10 PDF Analyzed</p>
          </div>
          <button className="text-indigo-600 hover:text-indigo-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
