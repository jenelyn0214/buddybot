// import { getConversationsByThread } from '@/app/lib/conversation';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  //     const token = req.headers.get('api-token') as string;
  //     const reqBody = await req.json();

  //     const { message, threadId } = reqBody;
  //     let conversation;

  //     if (threadId) {
  //         const conversations = await getConversationsByThread(threadId);
  //         conversation =
  //             conversations && conversations.length ? conversations[0] : undefined;
  //     }

  //     const parseData = await parseMessage(
  //         message,
  //         !!threadId,
  //         conversation?.contextMap ?? undefined
  //     );
  //     const { promptType } = parseData;

  //     let response;
  //     let isWaiting = false;
  //     let additionalInstructions;
  //     let contextMap = parseData.contextMap;
  //     let dynamicPrompts = parseData.dynamicPrompts;

  //     if (promptType === PromptType.COMMUNICATION) {
  //         response = await handleCommunication(parseData);
  //     } else if (promptType === PromptType.VV_RELATED) {
  //         isWaiting = true;
  //         const vvRelatedResponse = await handleVVRelatedPrompts(
  //             parseData,
  //             token,
  //             contextMap
  //         );
  //         response = vvRelatedResponse?.responseText;

  //         if (vvRelatedResponse?.contextMap) {
  //             contextMap = vvRelatedResponse?.contextMap;
  //         }

  //         if (vvRelatedResponse?.returnImmediately) {
  //             additionalInstructions = `Respond with this specific message exactly as provided, without omitting or adding any words.\n\n
  //             Here's the message: ${vvRelatedResponse.responseText}`;
  //         } else {
  //             const seeMoreInstruction = vvRelatedResponse?.responseRaw?.seeMore
  //                 ? `And this link right after the table with no other words
  //     [${vvRelatedResponse?.responseRaw?.seeMore.label}](${vvRelatedResponse?.responseRaw?.seeMore.link}).`
  //                 : '';

  //             const responseMessageInstruction = parseData.responseMessage
  //                 ? `Add this specific message exactly as provided after the ${
  //                       vvRelatedResponse?.responseRaw?.seeMore ? 'link' : 'table'
  //                   }, without omitting or adding any words: ${
  //                       parseData.responseMessage
  //                   }`
  //                 : `Please add a brief text before the table ${
  //                       vvRelatedResponse?.responseRaw?.seeMore
  //                           ? 'and after the see more link'
  //                           : ''
  //                   }.`;

  //             additionalInstructions = `Here is the JSON data:
  //             \`\`\`json
  //             ${vvRelatedResponse?.responseRaw?.data}
  //             \`\`\`
  //             Please display this data as a markdown table and display all the columns in the table.
  //             Don't change the order of the data or any text from the json data. Use the json keys as table header titles.
  //             ${seeMoreInstruction}
  //             ${responseMessageInstruction}
  //         `;
  //         }
  //     } else {
  //         isWaiting = true;

  //         if (parseData.responseMessage) {
  //             additionalInstructions = `Respond with this specific message exactly as provided, without omitting or adding any words.\n\n
  //             Here's the message: ${parseData.responseMessage}`;

  //             response = parseData.responseMessage;
  //         }
  //     }

  //     if (
  //         promptType !== PromptType.COMMUNICATION &&
  //         conversation?.contextMap?.includes('3')
  //     ) {
  //         const vvResponse = await handleAdditionalPromptsLogic(
  //             parseData,
  //             token,
  //             contextMap
  //         );

  //         if (vvResponse?.contextMap) {
  //             contextMap = vvResponse?.contextMap;
  //         }

  //         if (vvResponse?.dynamicPrompts) {
  //             dynamicPrompts = vvResponse?.dynamicPrompts;
  //         }

  //         if (vvResponse) {
  //             const responseMessageInstruction = vvResponse.responseText
  //                 ? `Add this specific message exactly as provided after the table, without omitting or adding any words: ${vvResponse.responseText}`
  //                 : `Please add a brief text before and after the table`;

  //             additionalInstructions = `Here is the JSON data:
  //             \`\`\`json
  //             ${vvResponse?.responseRaw?.data}
  //             \`\`\`
  //             Please display this data as a markdown table and display all the columns in the table.
  //             Don't change the order of the data or any text from the json data. Use the json keys as table header titles.
  //             ${responseMessageInstruction}`;
  //         }
  //     }

  //     if (conversation && contextMap) {
  //         await updateContextMap(conversation.id, contextMap);
  //     }

  //     let runResponse;
  //     if (threadId) {
  //         const run = await addThreadMessage(
  //             message,
  //             threadId,
  //             additionalInstructions
  //         );
  //         runResponse = {
  //             threadId: run.thread_id,
  //             runId: run.id,
  //         };
  //     } else {
  //         const run = await createThread(message, additionalInstructions);
  //         runResponse = {
  //             threadId: run.thread_id,
  //             runId: run.id,
  //         };
  //     }

  //     const extracted = extractTitleAndMessage(response ?? '');

  // return NextResponse.json({
  //     title: extracted.title,
  //     response: extracted.response ?? ChatResponses.NO_MESSAGE_RESULT,
  //     isWaiting,
  //     ...runResponse,
  //     contextMap,
  //     dynamicPrompts,
  // });

  NextResponse.json({ isNothing: true });
}

