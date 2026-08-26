// wrapper à volta do provider (troca fácil do modelo)
import { ChatOpenAI } from "@langchain/openai";

export const llm = new ChatOpenAI({
  model: "gpt-5.4-mini",
  apiKey: process.env.OPENAI_API_KEY,
});
