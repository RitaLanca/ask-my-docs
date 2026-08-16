"use client";

import { useActionState, useState } from "react";

import { uploadDocument, type UploadState } from "@/app/actions/upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type SourceType = "url" | "file";

const ACCEPTED_FILE_TYPES =
  ".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";

const initialState: UploadState = { status: "idle" };

export const UploadPanel = () => {
  const [sourceType, setSourceType] = useState<SourceType>("url");
  const [state, formAction, pending] = useActionState(
    uploadDocument,
    initialState,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar um documento</CardTitle>
        <CardDescription>
          Escolha se quer indexar o conteúdo de um URL ou carregar um ficheiro.
          O conteúdo será usado para alimentar a base de conhecimento.
        </CardDescription>
      </CardHeader>

      <form className="flex flex-col gap-6" action={formAction}>
        <CardContent className="flex flex-col gap-6">
          <RadioGroup
            value={sourceType}
            onValueChange={(value) => {
              setSourceType(value as SourceType);
            }}
            name="sourceType"
          >
            <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="url" id="source-type-url" />
                <Label htmlFor="source-type-url">URL</Label>
              </div>
              <Input
                id="url-input"
                name="url"
                type="url"
                aria-label="Endereço do documento"
                placeholder="https://exemplo.com/documento"
                disabled={sourceType !== "url"}
                required={sourceType === "url"}
              />

              <div className="flex items-center gap-2">
                <RadioGroupItem value="file" id="source-type-file" />
                <Label htmlFor="source-type-file">
                  Ficheiro (PDF, Word, TXT, ...)
                </Label>
              </div>
              <Input
                id="file-input"
                name="file"
                type="file"
                aria-label="Carregar ficheiro"
                accept={ACCEPTED_FILE_TYPES}
                disabled={sourceType !== "file"}
                required={sourceType === "file"}
              />
            </div>
          </RadioGroup>
        </CardContent>

        <CardFooter className="flex flex-col items-stretch gap-3">
          {state.status !== "idle" && (
            <p
              aria-live="polite"
              className={
                state.status === "error"
                  ? "text-sm text-destructive"
                  : "text-sm text-muted-foreground"
              }
            >
              {state.message}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "A processar..." : "Adicionar à base de conhecimento"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
