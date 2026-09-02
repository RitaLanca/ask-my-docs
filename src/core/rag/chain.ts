import { llm } from "../llm/client";
import { buildRagPrompt } from "./prompt";
import { retrieve } from "./vectorStore";

// task 3: orchestrate retrieval → prompt → LLM
export const orchestrate = async (question: string): Promise<string> => {
  const retrievedChunks = await retrieve(question, 4);
  const prompt = buildRagPrompt(question, retrievedChunks);
  const response = await llm.invoke(prompt);
  return response.content as string;
};
