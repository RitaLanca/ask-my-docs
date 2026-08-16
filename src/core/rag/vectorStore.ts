import { Document as LangchainDocument } from "@langchain/core/documents";

import { vectorStore } from "../db/vectorDB";
import { DocMetadata } from "./types";

// task 2: embeddings + similarity search
export const saveDocuments = async (
  documents: LangchainDocument<DocMetadata>[],
) => {
  const sources = new Set(documents.map((document) => document.metadata.source));
  vectorStore.memoryVectors = vectorStore.memoryVectors.filter(
    (vector) => !sources.has(vector.metadata.source),
  );

  await vectorStore.addDocuments(documents);
};
