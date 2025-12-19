
import React, { useState, useCallback, useRef } from 'react';
import { AnalysisResult, ChatMessage, PdfFile } from './types';
import { analyzePdf, chatWithPdf } from './services/gemini';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FileUploader from './components/FileUploader';

const App: React.FC = () => {
  const [pdf, setPdf] = useState<PdfFile | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      setError("Please select a valid PDF file.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const newPdf: PdfFile = {
          name: file.name,
          size: file.size,
          base64,
          objectUrl: URL.createObjectURL(file)
        };
        setPdf(newPdf);
        
        const result = await analyzePdf(base64);
        setAnalysis(result);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setError("An error occurred while analyzing the PDF.");
      setIsLoading(false);
    }
  };

  const reset = () => {
    setPdf(null);
    setAnalysis(null);
    setChatHistory([]);
    setError(null);
    setIsChatting(false);
  };

  const handleSendMessage = async (content: string) => {
    if (!pdf) return;
    
    const userMessage: ChatMessage = { role: 'user', content };
    setChatHistory(prev => [...prev, userMessage]);
    setIsChatting(true);

    try {
      const response = await chatWithPdf(pdf.base64, chatHistory, content);
      const modelMessage: ChatMessage = { role: 'model', content: response };
      setChatHistory(prev => [...prev, modelMessage]);
    } catch (err) {
      console.error(err);
      setError("Could not get a response from the AI.");
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      <Header onReset={reset} />
      
      <main className="flex flex-1 overflow-hidden">
        {!pdf ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-xl w-full text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Analyze any document with Lumina</h2>
              <p className="text-slate-600 mb-8">
                Upload your research paper, legal document, or textbook for a lightning-fast summary and interactive Q&A.
              </p>
              <FileUploader 
                onFileSelect={handleFileUpload} 
                isLoading={isLoading} 
                inputRef={fileInputRef} 
              />
              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <Sidebar 
              pdf={pdf} 
              analysis={analysis} 
              onAskSuggested={handleSendMessage}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Dashboard 
                analysis={analysis}
                chatHistory={chatHistory}
                onSendMessage={handleSendMessage}
                isChatting={isChatting}
                isLoading={isLoading}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
