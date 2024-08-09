import { NextRequest, NextResponse } from "next/server";
// import { getConversationMessages } from "@/api/conversation";
// import {
//   formatConversationMessages,
//   getThreadMessages,
// } from "@/api/conversation";

export async function GET(
  req: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  //   const { conversationId } = params;

  //   const conversationData = await getConversationMessages(conversationId);

  //   if (conversationData?.threadId) {
  //     const messages = await getThreadMessages(conversationData?.threadId);
  //     const formattedMessages = await formatConversationMessages(messages);

  //     return NextResponse.json({ messages: formattedMessages });
  //   }

  return NextResponse.json({ messages: [] });
}

