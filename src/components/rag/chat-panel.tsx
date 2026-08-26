"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useActionState } from "react";
import { ask } from "@/app/actions/chat";
import { vectorStore } from "@/core/db/vectorDB";

export const ChatPanel = () => {
  const [state, formAction, pending] = useActionState(ask, {
    status: "idle",
    messages: [],
  });

  console.log("MEMORIA", vectorStore.memoryVectors);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expôe a tua duvida</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <form className="flex flex-col gap-6" action={formAction}>
          <MessageScrollerProvider>
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent>
                  {state.messages.map((message) => (
                    <MessageScrollerItem
                      key={message.id}
                      messageId={message.id}
                      scrollAnchor={message.role === "user"}
                    >
                      <Message
                        align={message.role === "user" ? "end" : "start"}
                      >
                        <MessageAvatar>
                          {message.role === "user" ? "Tu" : "IA"}
                        </MessageAvatar>
                        <MessageContent>{message.content}</MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
          <Input
            id="query-input"
            name="query"
            type="text"
            aria-label="Field to insert your question"
            placeholder="Enter your question"
          />
          <Button type="submit" className="w-full">
            {pending ? "Sending" : "Send"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
