"use server";

import { orchestrate } from "@/core/rag/chain";
import { randomUUID } from "crypto";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type AskState = {
  status: "idle" | "success" | "error";
  messages: ChatMessage[];
};

export async function ask(
  prevState: AskState,
  formData: FormData,
): Promise<AskState> {
  const query = formData.get("query") as string;
  if (typeof query !== "string" || !query.trim()) {
    return prevState;
  }

  const userMessage: ChatMessage = {
    id: randomUUID(),
    role: "user",
    content: query,
  };

  try {
    const answer = await orchestrate(query);
    const assistantMessage: ChatMessage = {
      id: randomUUID(),
      role: "assistant",
      content: answer,
    };
    return {
      status: "success",
      messages: [...prevState.messages, userMessage, assistantMessage],
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      messages: [...prevState.messages, userMessage],
    };
  }
}
