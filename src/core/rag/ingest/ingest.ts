import { loaders } from "./loaders";

// task 1: load + clean text
type source_format = "html";

export async function ingest(source: string, format: source_format) {
  const loader = loaders[format]; // escolhe o loader certo
  const { text, metadata } = await loader(source);

  const pageContent = normalize(text);
  return { pageContent, metadata };
}

// common clean (reduces multiple spaces to just one space)
// TODO: prompt ingection detection, data poisoning
function normalize(text: string) {
  return text.replace(/\s+/g, " ").trim();
}
