
import React from 'react';

interface FileUploaderProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, isLoading, inputRef }) => {
  return (
    <div className="relative">
      <input
        type="file"
        className="hidden"
        accept="application/pdf"
        onChange={onFileSelect}
        ref={inputRef}
      />
      
      <button
        onClick={() => inputRef.current?.click()}
        disabled={isLoading}
        className={`w-full group flex flex-col items-center justify-center gap-4 p-12 border-2 border-dashed rounded-2xl transition-all
          ${isLoading 
            ? 'bg-slate-50 border-slate-200 cursor-not-allowed' 
            : 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30'
          }`}
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-slate-700">Analyzing your document...</p>
            <p className="text-sm text-slate-500">Gemini is reading through the pages</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-800">Drop your PDF here or click to browse</p>
              <p className="text-sm text-slate-500 mt-1">Supports files up to 10MB</p>
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default FileUploader;
