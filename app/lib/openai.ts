const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
import openai from "openai";
import { SYSTEM_PROMPTS } from "../constants/openai";

export const sendOpenAIMessage = async (prompt: string) => {
  const openaiClient = new openai.OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const completion = await openaiClient.chat.completions.create({
    messages: [...SYSTEM_PROMPTS, { role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    max_tokens: 300,
  });

  return completion.choices?.[0].message.content;
};

export const createThread = async (
  prompt: string,
  assistantId: string,
  additionalInstructions?: string
) => {
  const openaiClient = new openai.OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const messages: openai.Beta.Threads.ThreadCreateAndRunParams.Thread.Message[] =
    [
      {
        role: "user",
        content: prompt,
      },
      {
        role: "assistant",
        content:
          "Please generate a title based on the prompt and enclose it in a curly brackets. Put the title at the beginning of the reponse. \n\n" +
          (additionalInstructions ?? ""),
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

export const addThreadMessage = async (
  prompt: string,
  threadId: string,
  assistantId: string,
  additionalInstructions?: string
) => {
  const openaiClient = new openai.OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  await openaiClient.beta.threads.messages.create(threadId, {
    content: prompt,
    role: "user",
  });

  await openaiClient.beta.threads.messages.create(threadId, {
    content:
      "Don't add title on next reponse.\n\n" + (additionalInstructions ?? ""),
    role: "assistant",
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

