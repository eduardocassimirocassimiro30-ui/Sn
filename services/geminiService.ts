
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSensationalHeadline = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma manchete de jornal sensacionalista dos anos 90 para o seguinte tópico: ${topic}. 
      A manchete deve ser em Português, exagerada, em letras maiúsculas, e conter termos urbanos ou policiais. 
      Responda apenas com a manchete em formato JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            subtitle: { type: Type.STRING }
          },
          required: ["headline", "subtitle"]
        }
      }
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Erro ao gerar manchete:", error);
    return { 
      headline: "ERRO NO SISTEMA DE COMUNICAÇÃO!", 
      subtitle: "Fontes anônimas dizem que a verdade está sendo omitida." 
    };
  }
};
