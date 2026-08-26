import { Document as LangchainDocument } from "@langchain/core/documents";

import { vectorStore } from "../db/vectorDB";
import { DocMetadata, RetrievedChunk } from "./types";

// task 2: embeddings + similarity search
export const saveDocuments = async (
  documents: LangchainDocument<DocMetadata>[],
) => {
  const sources = new Set(
    documents.map((document) => document.metadata.source),
  );
  vectorStore.memoryVectors = vectorStore.memoryVectors.filter(
    (vector) => !sources.has(vector.metadata.source),
  );

  await vectorStore.addDocuments(documents);
};

export async function retrieve(
  question: string,
  k = 3,
  minScore = 0.75,
): Promise<RetrievedChunk[]> {
  const results = await vectorStore.similaritySearchWithScore(question, k);

  console.log(`\n[RESULT] Vector DB returned ${results.length} candidates.`);

  results.forEach(([doc, score], i) => {
    console.log(`\n--- CHUNK #${i + 1} (score: ${score}) ---`);
    console.log(`Origem (Metadata):`, doc.metadata.source);
    console.log(`Conteúdo:`, doc.pageContent);
  });

  return results
    .filter(([, score]) => score >= minScore)
    .map(([doc]) => ({
      pageContent: doc.pageContent,
      metadata: {
        source: doc.metadata?.source,
        format: doc.metadata?.format,
        fetchedAt: doc.metadata?.fetchedAt,
      },
    }));
}
