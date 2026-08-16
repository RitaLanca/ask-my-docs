export type DocMetadata = {
  source: string;
  format: string;
  fetchedAt: string;
};

export type Document = { pageContent: string; metadata: DocMetadata };

export type Loader = (source: string) => Promise<Document>;
