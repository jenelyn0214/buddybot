import { getConversations } from "@/app/lib/conversation";
import { getAssitants } from "@/app/lib/openai";
import { User } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = (await getToken({ req })) as User;

  const conversationData = await getConversations(token.id);

  return NextResponse.json({ conversations: conversationData });
}

