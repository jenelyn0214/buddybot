import { checkRun, getRunMessages } from "@/app/lib/openai";
import { NextRequest, NextResponse } from "next/server";
import { TextContentBlock } from "openai/resources/beta/threads/messages.mjs";

interface RequestContext {
  params: {
    threadId: string;
    runId: string;
  };
}

export async function GET(req: NextRequest, ctx: RequestContext) {
  const { params } = ctx;
  const { threadId, runId } = params;

  const run = await checkRun(threadId, runId);

  if (run.status === "completed") {
    const messages = await getRunMessages(threadId, runId);
    const content = messages.data[0].content[0] as TextContentBlock;

    return NextResponse.json({
      isWaiting: false,
      response: content.text.value,
      runId,
      threadId,
    });
  }

  return NextResponse.json({ isWaiting: true });
}

