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
  $("meta, link, script, style, noscript, nav, footer, header").remove();

  // 3. Convert relevant HTML elements into structured plain text
  const parts: string[] = [];
  $("body")
    .find("h1, h2, h3, h4, p, li, pre, blockquote")
    .each((_, element) => {
      const tag = element.tagName.toLowerCase();
      const text = $(element).text().trim();
      if (!text) {
        return;
      }
      switch (tag) {
        case "h1":
          parts.push(`# ${text}`);
          break;
        case "h2":
          parts.push(`## ${text}`);
          break;
        case "h3":
          parts.push(`### ${text}`);
          break;
        case "h4":
          parts.push(`#### ${text}`);
          break;
        case "li":
          parts.push(`- ${text}`);
          break;
        case "pre":
          parts.push(`\`\`\`\n${text}\n\`\`\``);
          break;
        case "blockquote":
          parts.push(`> ${text}`);
          break;
        default:
          parts.push(text);
      }
    }); // 4. Join the elements while preserving logical boundaries const cleanText = parts .join("\n\n") .replace(/\n{3,}/g, "\n\n") .trim();

  // Extract clean text content
  // const cleanText = $("body").text().trim();

  const cleanText = parts
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  console.log("Clean text:");
  console.log("\n========================\n");
  console.log(cleanText);

  return {
    pageContent: cleanText,
    metadata: {
      source,
      format: "html",
      fetchedAt: new Date().toISOString(),
    },
  };
};
