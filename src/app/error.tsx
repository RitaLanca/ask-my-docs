"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 p-16 text-center dark:bg-black">
      <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
        Ocorreu um erro inesperado
      </h2>
      <p className="max-w-md text-sm text-muted-foreground">
        {error.message || "Tenta novamente."}
      </p>
      <Button onClick={() => retry()}>Tentar novamente</Button>
    </div>
  );
}
