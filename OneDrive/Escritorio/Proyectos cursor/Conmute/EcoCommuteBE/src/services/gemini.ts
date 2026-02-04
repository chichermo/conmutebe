import axios from 'axios';
import { GEMINI_API_KEY } from '../constants/config';

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
  }>;
};

export const generateGeminiSummary = async (prompt: string): Promise<string> => {
  if (!GEMINI_API_KEY) {
    return 'Sugerencia IA: prioriza modos verdes con buen clima y baja congestión.';
  }

  const { data } = await axios.post<GeminiResponse>(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    { contents: [{ parts: [{ text: prompt }] }] },
    { timeout: 10000 },
  );

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    'Sugerencia IA no disponible.';
  return text;
};
