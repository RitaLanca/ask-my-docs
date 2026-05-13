import { Suspense } from "react";

async function fetchDoc() {
  const DOC_URL = "https://react.dev/learn/thinking-in-react";

  const response = await fetch(DOC_URL, {
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch doc: ${response.status}`);
  }

  return response.text();
}

async function DocContent() {
  let shortenContent = null;
  try {
    const html = await fetchDoc();
    // Removes HTML tags and reduces multiple spaces to just one space
    const stripData = html
      .replace(/<script[\s\S]*?<\/script>/gi, "") // remove scripts
      .replace(/<style[\s\S]*?<\/style>/gi, "") // remove styles
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    shortenContent = stripData.slice(0, 500);
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
