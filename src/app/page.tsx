import { ingest } from "@/core/rag/ingest/ingest";
import { Suspense } from "react";

async function fetchDoc() {
  // const DOC_URL = "https://react.dev/learn/thinking-in-react";
  const DOC_URL =
    "https://www.epicweb.dev/4-practical-ways-to-speed-up-your-loaders-in-react-router-v7-9z8as";
  return ingest(DOC_URL, "html-url");
}

async function DocContent() {
  let shortenContent = null;
  try {
    const { pageContent } = await fetchDoc();

    shortenContent = pageContent;
    console.log("data123\n");
    console.log(JSON.stringify(shortenContent));
  } catch {
    console.error("error");
  }

  if (!shortenContent) {
    return <p>Could not load document</p>;
  }

  return <p>{shortenContent.length} characters fetched.</p>;
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            ASK MY-DOCS
          </h1>
          <Suspense fallback={<p>Loading document...</p>}>
            <DocContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
