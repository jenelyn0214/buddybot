import { Conversation } from "@prisma/client";
import { CHATBOT_KEYS } from "../constants/openai";
import axiosClient from "../lib/axiosClient";
import { IMessage } from "../types/types";
import { threadId } from "worker_threads";

export interface MessageResponse {
  threadId: string;
  runId: string;
  isWaiting: string;
  response?: string;
  conversation?: Conversation;
}

const sendMessage = async ({
  message,
  assistant,
  threadId,
}: {
  message: string;
  assistant: CHATBOT_KEYS;
  threadId?: string;
}): Promise<MessageResponse | undefined> => {
  try {
    const res = await axiosClient.post<MessageResponse>("/api/message", {
      message,
      assistant,
      threadId,
    });

    console.log("API request res:", res);
    return res.data;
  } catch (err) {
    console.error("API request error:", err);
  }
};

const getConversations = async (): Promise<Conversation[]> => {
  try {
    const res = await axiosClient.get<{ conversations: Conversation[] }>(
      "/api/conversation"
    );

    console.log("API request res:", res);

    return res.data.conversations;
  } catch (err) {
    console.error("API request error:", err);

    return [];
  }
};

const checkResponse = async ({
  threadId,
  runId,
}: {
  threadId: string;
  runId: string;
}): Promise<MessageResponse | undefined> => {
  try {
    const res = await axiosClient.get<MessageResponse>(
      `/api/check-response/${threadId}/${runId}`
    );

    console.log("API request res:", res);

    return res.data;
  } catch (err) {
    console.error("API request error:", err);
  }
};

const getConversationMessages = async (
  conversationId: string
): Promise<IMessage[]> => {
  try {
    const res = await axiosClient.get<{ messages: IMessage[] }>(
      `/api/conversation/${conversationId}`
    );

    console.log("API request res:", res);

    return res.data.messages;
  } catch (err) {
    console.error("API request error:", err);

    return [];
  }
};

export const APIService = {
  sendMessage,
  getConversations,
  checkResponse,
  getConversationMessages,
};

