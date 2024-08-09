// import { Conversation, PrismaClient } from "@prisma/client";
// import { randomUUID } from "crypto";

// const prisma = new PrismaClient();

// export const createConversation = async (
//   threadId: string,
//   userId: number,
//   title: string,
//   contextMap?: string
// ): Promise<Conversation> => {
//   const conversation = await prisma.conversation.create({
//     data: {
//       threadId,
//       userId,
//       title,
//       contextMap,
//     },
//   });

//   return conversation;
// };

// export const getConversationsByThread = async (
//   threadId: string
// ): Promise<Conversation[]> => {
//   const conversations = await prisma.conversation.findMany({
//     where: {
//       threadId,
//     },
//   });

//   return conversations;
// };

// export const getConversations = async (
//   userId: string
// ): Promise<Conversation[]> => {
//   const conversations = await prisma.conversation.findMany({
//     where: {
//       userId,
//     },
//   });

//   return conversations;
// };

// export const getConversationMessages = async (
//   conversationId: string
// ): Promise<Conversation | null> => {
//   const conversation = await prisma.conversation.findFirst({
//     where: {
//       id: conversationId,
//     },
//   });

//   return conversation;
// };

// export const formatConversationMessages = async (
//   messages: MessagesPage
// ): Promise<IMessage[]> => {
//   const filterMessages = messages.data.filter(
//     (message) =>
//       message.role === "user" ||
//       (message.role === "assistant" && message.run_id)
//   );

//   const formattedMessages: IMessage[] = (filterMessages || []).map(
//     (message) => {
//       const content = message.content[0] as TextContentBlock;

//       const extracted = extractTitleAndMessage(content.text.value ?? "");

//       return {
//         message: extracted.response,
//         isOwn: message.role === "user",
//       };
//     }
//   );

//   return formattedMessages.reverse();
// };

// export const getShareConversation = async (
//   shareToken: string
// ): Promise<Conversation | null> => {
//   const conversation = await prisma.conversation.findFirst({
//     where: {
//       shareToken,
//     },
//   });

//   return conversation;
// };

// export const createShareLink = async (
//   conversationId: string
// ): Promise<Conversation> => {
//   const conversation = await prisma.conversation.update({
//     data: {
//       shareToken: randomUUID(),
//     },
//     where: {
//       id: conversationId,
//     },
//   });

//   return conversation;
// };

// export const updateContextMap = async (
//   id: string,
//   contextMap: string
// ): Promise<Conversation> => {
//   const conversation = await prisma.conversation.update({
//     data: {
//       contextMap,
//     },
//     where: {
//       id,
//     },
//   });

//   return conversation;
// };

// export const renameConversationTitle = async (
//   conversationId: string,
//   newTitle: string
// ): Promise<Conversation> => {
//   const conversation = await prisma.conversation.update({
//     data: {
//       title: newTitle,
//     },
//     where: {
//       id: conversationId,
//     },
//   });

//   return conversation;
// };

// export const deleteConversation = async (
//   conversationId: string
// ): Promise<Conversation> => {
//   const conversation = await prisma.conversation.delete({
//     where: {
//       id: conversationId,
//     },
//   });

//   return conversation;
// };

