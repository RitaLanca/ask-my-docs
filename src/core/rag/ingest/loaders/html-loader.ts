import { load } from "cheerio";

import type { Loader } from "../../types";

export const loadHtml: Loader = async (source) => {
  const response = await fetch(source, {
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch doc: ${response.status}`);
  }

  const html = await response.text();

  const $ = load(html);
  $("meta, link, script, style, noscript, nav, footer").remove();

  // Extract clean text content
  const cleanText = $("body").text().trim();

  return {
    pageContent: cleanText,
    metadata: {
      source,
      format: "html",
      fetchedAt: new Date().toISOString(),
    },
  };
};
