import { loaders } from "./loaders";

// task 1: load + clean text
type source_format = "html";

export async function ingest(source: string, format: source_format) {
  const loader = loaders[format]; // escolhe o loader certo
  try {
    const document = await loader(source);
    return document;
  } catch (e) {
    console.log("ERROR, ", e);
    return null;
  }
}
