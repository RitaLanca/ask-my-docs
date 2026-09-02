// Task 2: splitter
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document as LangchainDocument } from "@langchain/core/documents";
import { Document, DocMetadata } from "./types";

export const splitDocument = async (document: Document) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 150,
  });

  const docSplits = await splitter.splitDocuments([document]);
  return docSplits as LangchainDocument<DocMetadata>[];
};
