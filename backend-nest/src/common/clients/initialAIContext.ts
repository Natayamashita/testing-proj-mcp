// src/common/clients/openai.ts
import OpenAI from "openai";

let instance: OpenAI;

export const getOpenAI = (): OpenAI => {
  if (!instance) {
    instance = new OpenAI({
      baseURL: process.env.DEEPSEEK_URL,
      apiKey: process.env.DEEPSEEK_API_KEY,
    });
  }
  return instance;
};
