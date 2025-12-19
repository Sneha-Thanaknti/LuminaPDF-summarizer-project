
import React, { useState, useEffect, useRef } from 'react';
import { AnalysisResult, ChatMessage } from '../types';

interface DashboardProps {
  analysis: AnalysisResult | null;
  chatHistory: ChatMessage[];
  onSendMessage: (msg: string) => void;
  isChatting: boolean;
  isLoading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  analysis, 
  chatHistory, 
  onSendMessage, 
  isChatting,
  isLoading 
}) => {
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isChatting) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        {/* Analysis Section */}
        <section className="max-w-4xl mx-auto w-full">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-200 rounded w-1/4"></div>
              <div className="h-24 bg-slate-200 rounded"></div>
              <div className="h-24 bg-slate-200 rounded"></div>
            </div>
          ) : analysis ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-800">Summary Analysis</h2>
              </div>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
                  {analysis.summary}
                </p>
              </div>
            </div>
          ) : null}
        </section>

        {/* Chat Section */}
        <section className="max-w-4xl mx-auto w-full pb-24">
          {chatHistory.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mt-12 mb-6">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-slate-800">Q&A Session</h2>
              </div>
              
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm border
                    ${msg.role === 'user' 
                      ? 'bg-indigo-600 text-white border-indigo-500 rounded-tr-none' 
                      : 'bg-white text-slate-800 border-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isChatting && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-5 py-3 shadow-sm">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </section>
      </div>

      {/* Input Area */}
      {analysis && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6">
          <form 
            onSubmit={handleSubmit}
            className="relative bg-white rounded-2xl shadow-xl border border-slate-200 p-2 flex items-center transition-all focus-within:ring-2 ring-indigo-500/20"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question about the PDF..."
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 text-slate-800"
              disabled={isChatting}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isChatting}
              className={`p-3 rounded-xl transition-all
                ${!inputText.trim() || isChatting
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          <p className="text-center mt-2 text-[10px] text-slate-400">
            Lumina can make mistakes. Always verify important information.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
