import { NextRequest, NextResponse } from "next/server";
// import { checkRun, getRunMessages } from "@/api/conversation";
// import { extractTitleAndMessage } from "@/utils/data";

export async function GET(
  req: NextRequest,
  { params }: { params: { threadId: string; runId: string } }
) {
  //   const { threadId, runId } = params;

  //   const run = await checkRun(threadId, runId);

  //   if (run.status === "completed") {
  //     const messages = await getRunMessages(threadId, runId);
  //     const content = messages.data[0].content[0];

  //     const extracted = extractTitleAndMessage(content.text.value ?? "");

  //     return NextResponse.json({
  //       isWaiting: false,
  //       response: extracted.response,
  //       title: extracted.title,
  //     });
  //   }

  return NextResponse.json({ isWaiting: true, response: "" });
}

