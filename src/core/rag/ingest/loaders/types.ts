export type DocMetadata = {
  source: string;
  format: string;
  fetchedAt: string;
};

export type Loader = (
  source: string,
) => Promise<{ text: string; metadata: DocMetadata }>;
