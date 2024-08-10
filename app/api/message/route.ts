import { createConversation } from "@/app/lib/conversation";
import {
  addThreadMessage,
  createThread,
  getAssistantId,
} from "@/app/lib/openai";
import { User } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const token = (await getToken({ req })) as User;

  const { message, threadId, assistant } = reqBody;

  const assistantId = getAssistantId(assistant);

  let runResponse;
  if (threadId) {
    const run = await addThreadMessage({
      prompt: message,
      threadId,
      assistantId,
    });

    runResponse = {
      threadId: run.thread_id,
      runId: run.id,
      isWaiting: true,
    };
  } else {
    const run = await createThread({
      userName: token?.name ?? "",
      assistantId,
    });

    await createConversation(run.thread_id, token.id, assistant);

    runResponse = {
      threadId: run.thread_id,
      runId: run.id,
      isWaiting: true,
    };
  }

  return NextResponse.json(runResponse);
}

