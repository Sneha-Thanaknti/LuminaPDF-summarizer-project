
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzePdf = async (base64Pdf: string): Promise<AnalysisResult> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "application/pdf",
            data: base64Pdf
          }
        },
        {
          text: "Analyze this PDF and provide a comprehensive summary, 5 key insights, and 3 suggested follow-up questions for a user interested in the document's contents. Format the response as JSON."
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          keyInsights: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          suggestedQuestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["summary", "keyInsights", "suggestedQuestions"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Failed to generate analysis");
  return JSON.parse(text) as AnalysisResult;
};

export const chatWithPdf = async (base64Pdf: string, history: { role: string; content: string }[], newMessage: string): Promise<string> => {
  const chatHistoryParts = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...chatHistoryParts,
      {
        role: "user",
        parts: [
          { inlineData: { mimeType: "application/pdf", data: base64Pdf } },
          { text: newMessage }
        ]
      }
    ]
  });

  return response.text || "I'm sorry, I couldn't process that request.";
};
