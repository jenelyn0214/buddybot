const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

import openai from "openai";

export const getAssitants = async () => {
  const openaiClient = new openai.OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const assistants = await openaiClient.beta.assistants.list();

  return assistants;
};

export const createThread = async ({
  userName,
  assistantId,
}: {
  userName: string;
  assistantId: string;
}) => {
  const openaiClient = new openai.OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const messages: openai.Beta.Threads.ThreadCreateAndRunParams.Thread.Message[] =
    [
      {
        role: "assistant",
        content: `Greet the user and mention the user's name and introduce yourself. The user name is ${userName} `,
      },
    ];

  const run = await openaiClient.beta.threads.createAndRun({
    assistant_id: assistantId,
    thread: {
      messages,
    },
  });

  console.log("create run", run);

  return run;
};

export const addThreadMessage = async ({
  prompt,
  threadId,
  assistantId,
}: {
  prompt: string;
  threadId: string;
  assistantId: string;
}) => {
  const openaiClient = new openai.OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  await openaiClient.beta.threads.messages.create(threadId, {
    content: prompt,
    role: "user",
  });

  const run = await openaiClient.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });

  return run;
};

export const checkRun = async (threadId: string, runId: string) => {
  const openaiClient = new openai.OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const run = await openaiClient.beta.threads.runs.retrieve(threadId, runId);

  return run;
};

export const getRunMessages = async (threadId: string, runId: string) => {
  const openaiClient = new openai.OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const messages = await openaiClient.beta.threads.messages.list(threadId, {
    run_id: runId,
  });

  return messages;
};

export const getThreadMessages = async (threadId: string) => {
  const openaiClient = new openai.OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const messages = await openaiClient.beta.threads.messages.list(threadId);

  return messages;
};

export const getAssistantId = (assistantKey: string): string => {
  console.log(
    "assistantKey",
    assistantKey,
    process.env["ASSISTANT_KEY_" + assistantKey]
  );

  return process.env["ASSISTANT_KEY_" + assistantKey] || "";
};

