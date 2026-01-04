
import { GoogleGenAI, Type } from "@google/genai";
import { NumberInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getNumberInsight(num: number): Promise<NumberInsight> {
  const isPrimeLocal = checkIsPrime(num);
  
  const prompt = `Analyze the number ${num}. 
  Determine if it's prime. 
  Provide a concise mathematical explanation of why it is or isn't prime. 
  Share one interesting historical context or usage of this number (or its category). 
  Include one fun or surprising mathematical fact related to this number.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            is_prime: { type: Type.BOOLEAN },
            explanation: { type: Type.STRING },
            historical_context: { type: Type.STRING },
            fun_fact: { type: Type.STRING }
          },
          required: ["is_prime", "explanation", "historical_context", "fun_fact"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback for offline or error states
    return {
      is_prime: isPrimeLocal,
      explanation: isPrimeLocal 
        ? `${num} is only divisible by 1 and itself.` 
        : `${num} has divisors other than 1 and itself.`,
      historical_context: "Mathematical data currently unavailable.",
      fun_fact: "Numbers are the language of the universe."
    };
  }
}

function checkIsPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i = i + 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}
