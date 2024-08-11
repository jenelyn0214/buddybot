import { Conversation, PrismaClient } from "@prisma/client";
import {
  MessagesPage,
  TextContentBlock,
} from "openai/resources/beta/threads/messages.mjs";
import { IMessage } from "../types/types";

const prisma = new PrismaClient();

export const createConversation = async (
  threadId: string,
  userId: string,
  assistant: string
): Promise<Conversation> => {
  const conversation = await prisma.conversation.create({
    data: {
      threadId,
      userId,
      assistant,
    },
  });

  return conversation;
};

export const getConversationsByThread = async (
  threadId: string
): Promise<Conversation[]> => {
  const conversations = await prisma.conversation.findMany({
    where: {
      threadId,
    },
  });

  return conversations;
};

export const getConversations = async (
  userId: string
): Promise<Conversation[]> => {
  const conversations = await prisma.conversation.findMany({
    where: {
      userId,
    },
  });

  return conversations;
};

export const getConversationMessages = async (
  conversationId: string
): Promise<Conversation | null> => {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
    },
  });

  return conversation;
};

export const deleteConversation = async (
  conversationId: string
): Promise<Conversation> => {
  const conversation = await prisma.conversation.delete({
    where: {
      id: conversationId,
    },
  });

  return conversation;
};

export const formatConversationMessages = async (
  messages: MessagesPage
): Promise<IMessage[]> => {
  const filterMessages = messages.data.filter(
    (message) =>
      message.role === "user" ||
      (message.role === "assistant" && message.run_id)
  );

  const formattedMessages: IMessage[] = (filterMessages || []).map(
    (message) => {
      const content = message.content[0] as TextContentBlock;

      return {
        message: content.text.value,
        isOwn: message.role === "user",
      };
    }
  );

  return formattedMessages.reverse();
};

