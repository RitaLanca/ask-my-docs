"use server";

import { splitDocument } from "@/core/rag/chunk";
import { ingest } from "@/core/rag/ingest/ingest";
import { saveDocuments } from "@/core/rag/vectorStore";

export type UploadState = {
  status: "idle" | "success" | "error";
  message?: string;
};

// TODO: read the source from formData once URL/file ingestion is wired up.
const DOC_URL =
  "https://www.epicweb.dev/4-practical-ways-to-speed-up-your-loaders-in-react-router-v7-9z8as";

export async function uploadDocument(
  _prevState: UploadState,
  _formData: FormData,
): Promise<UploadState> {
  try {
    const document = await ingest(DOC_URL, "html");
    const splits = await splitDocument(document);
    await saveDocuments(splits);

    return {
      status: "success",
      message: `${splits.length} excertos guardados na base de conhecimento.`,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Não foi possível adicionar o documento. Tente novamente.",
    };
  }
}
