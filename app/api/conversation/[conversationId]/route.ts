import {
  formatConversationMessages,
  getConversationMessages,
} from "@/app/lib/conversation";
import { getThreadMessages } from "@/app/lib/openai";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext {
  params: {
    conversationId: string;
  };
}

export async function GET(req: NextRequest, ctx: RequestContext) {
  const { params } = ctx;
  const { conversationId } = params;

  const conversationData = await getConversationMessages(conversationId);

  if (conversationData?.threadId) {
    const messages = await getThreadMessages(conversationData?.threadId);
    const formattedMessages = await formatConversationMessages(messages);

    return NextResponse.json({ messages: formattedMessages });
  }

  return NextResponse.json({ messages: [] });
}

