import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  const { title, threadId, userId, contextMap } = reqBody;
  const conversation = null;

  // const conversation = await createConversation(
  //     threadId,
  //     userId,
  //     title,
  //     contextMap
  // );

  return NextResponse.json({ conversation });
}

