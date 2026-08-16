import { loadHtml } from "./html-loader";
import type { Loader } from "../../types";

export const loaders: Record<string, Loader> = {
  html: loadHtml,
};
