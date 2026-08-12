import type { Loader } from "./types";
import { convert } from "html-to-text";

export const loadHtml: Loader = async (source) => {
  const response = await fetch(source, {
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch doc: ${response.status}`);
  }

  const html = await response.text();

  // Removes HTML tags
  // const text = html
  //   .replace(/<script[\s\S]*?<\/script>/gi, "")
  //   .replace(/<style[\s\S]*?<\/style>/gi, "")
  //   .replace(/<[^>]+>/g, " ");

  const stripData = convert(html, {
    wordwrap: false,
    preserveNewlines: false,
    selectors: [
      { selector: "a", options: { ignoreHref: true } }, // Ignora os links literais (ex: [http://...]) para poupar tokens
      { selector: "img", format: "skip" }, // Ignora imagens
      { selector: "nav", format: "skip" }, // TENTA IGNORAR O MENU DE NAVEGAÇÃO
      { selector: "footer", format: "skip" }, // Ignora o rodapé
    ],
  });

  return {
    text: stripData,
    metadata: {
      source,
      format: "html-url",
      fetchedAt: new Date().toISOString(),
    },
  };
};
