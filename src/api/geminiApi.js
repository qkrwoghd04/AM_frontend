import { GoogleGenerativeAI } from "@google/generative-ai";

const api_key = import.meta.env.VITE_GEMINI_API_KEY;
export const genAI = new GoogleGenerativeAI(api_key);