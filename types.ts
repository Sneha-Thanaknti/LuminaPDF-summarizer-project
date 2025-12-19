
export interface AnalysisResult {
  summary: string;
  keyInsights: string[];
  suggestedQuestions: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface PdfFile {
  name: string;
  size: number;
  base64: string;
  objectUrl: string;
}
