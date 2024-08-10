"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "@/app/lib/axiosClient";
import { Conversation } from "@prisma/client";
import { CHATBOT_KEYS, chatbots, IChatbot } from "../constants/openai";
import Loading from "../components/Loading";
import { APIService } from "./service";
import { IMessage } from "../types/types";

const Chatbot = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [isFetchingMessage, setIsFetchingMessage] = useState(true);
  const [selectedChatbot, setSelectedChatbot] = useState<IChatbot | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [conversationThreads, setConversationThreads] = useState<
    Conversation[]
  >([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const conversations = await APIService.getConversations();
        const currentConversation = conversations.find(
          (item) => item.assistant === chatbots[0].slug
        );

        console.log("conversations", conversations);

        console.log("currentConversation", currentConversation);

        setConversationThreads(conversations);
        setSelectedChatbot({ ...chatbots[0], ...(currentConversation ?? {}) });
        setLoading(false);
      } catch (error) {
        console.error("Failed to load conversations:", error);
        setLoading(false);
      }
    };
    if (session?.user?.id) {
      getConversations();
    }
  }, [session?.user?.id]);

  useEffect(() => {
    const getConversationMessages = async () => {
      setIsFetchingMessage(() => true);
      setMessages([]);
      if (!selectedChatbot?.id && selectedChatbot && selectedChatbot.slug) {
        sendMessage({
          message: "",
          slug: selectedChatbot.slug,
          isInitial: true,
        });

        return;
      }

      if (!selectedChatbot?.id) {
        return;
      }

      try {
        const messages = await APIService.getConversationMessages(
          selectedChatbot.id.toString()
        );

        setMessages(messages);
        setIsFetchingMessage(false);
      } catch (error) {
        console.error("Failed to load conversation messages:", error);
      }
    };

    getConversationMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChatbot?.slug]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async ({
    message,
    slug,
    threadId,
    isInitial = false,
  }: {
    message: string;
    slug: CHATBOT_KEYS;
    threadId?: string;
    isInitial?: boolean;
  }) => {
    try {
      const sendMessageResponse = await APIService.sendMessage({
        message,
        assistant: slug,
        threadId,
      });
      if (
        !sendMessageResponse ||
        !sendMessageResponse.threadId ||
        !sendMessageResponse.runId
      ) {
        console.error(
          "Failed to send message: Response is undefined or missing required fields"
        );
        setIsTyping(() => false);
        return;
      }

      if (!selectedChatbot?.threadId) {
        setSelectedChatbot((prev) => {
          return {
            ...prev,
            threadId: sendMessageResponse?.threadId,
          } as IChatbot;
        });
      }

      const checkMessage = async () => {
        while (true) {
          const checkResponse = await APIService.checkResponse({
            threadId: sendMessageResponse.threadId,
            runId: sendMessageResponse.runId,
          });

          if (checkResponse?.isWaiting) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          } else {
            if (isInitial) {
              setMessages([
                {
                  message: checkResponse?.response ?? "",
                  isOwn: false,
                },
              ]);
            } else {
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  message: checkResponse?.response ?? "",
                  isOwn: false,
                },
              ]);
            }

            setIsFetchingMessage(() => false);
            setIsTyping(() => false);
            break;
          }
        }
      };

      await checkMessage();
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsTyping(() => false);

      setIsFetchingMessage(() => false);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedChatbot || !newMessage.trim()) return;

    setIsTyping(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: newMessage, isOwn: true },
    ]);
    setNewMessage("");

    sendMessage({
      message: newMessage,
      slug: selectedChatbot.slug,
      threadId: selectedChatbot.threadId,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isTyping) {
      handleSendMessage();
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!loading && !session?.user) {
    router.push("/login");
    return;
  }
  console.log("isTyping", isTyping);

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      {/* Sidebar */}
      <div className="w-1/3 bg-white text-gray-900 p-4 flex flex-col rounded-l-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Hi, {session?.user?.name}</h2>
          <button
            onClick={() => signOut()}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 underline flex items-center"
          >
            Logout <FontAwesomeIcon icon={faSignOutAlt} className="ml-2" />
          </button>
        </div>
        <h2 className="text-lg font-bold mb-4 text-blue-600">Chatbots</h2>
        <ul className="flex-grow overflow-y-auto">
          {chatbots.map((bot, index) => {
            const currentConversation = conversationThreads.find(
              (item) => item.assistant === bot.slug
            );

            return (
              <li
                key={index}
                className={`p-4 mb-2 rounded cursor-pointer flex items-start ${
                  selectedChatbot?.slug === bot.slug
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100 text-gray-800"
                }`}
                onClick={() => {
                  setSelectedChatbot({
                    ...bot,
                    ...(currentConversation ?? {}),
                  });
                }}
              >
                <FontAwesomeIcon icon={bot.icon} className="mr-2 mt-1" />
                <div>
                  <div className="font-bold">{bot.name}</div>
                  <div
                    className={`text-xs italic ${
                      selectedChatbot?.slug === bot.slug
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {bot.description}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 p-4 flex flex-col h-full bg-white rounded-r-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-blue-600">
          {selectedChatbot?.name}
        </h3>
        <div className="flex-grow p-4 bg-gray-100 rounded shadow-inner overflow-y-auto">
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-2 max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg rounded ${
                message.isOwn
                  ? "bg-blue-600 text-white self-end ml-auto"
                  : "bg-gray-300 text-gray-900 self-start mr-auto"
              }`}
            >
              <p>
                {typeof message.message === "string" ? message.message : ""}
              </p>
            </div>
          ))}
          {isTyping && (
            <div className="self-start bg-gray-300 text-gray-700 p-2 max-w-xs rounded mb-4 animate-pulse">
              <p className="text-sm italic">Typing...</p>
            </div>
          )}
          {isFetchingMessage && (
            <div className="self-center ml-auto mr-auto bg-gray-300 text-gray-700 p-2 max-w-xs rounded mb-4 animate-pulse">
              <p className="text-sm italic text-center">Loading...</p>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            className={`ml-2 px-4 py-2 ${
              isTyping || isFetchingMessage ? "bg-gray-400" : " bg-blue-600"
            } text-white rounded hover:bg-blue-700 flex items-center`}
            disabled={isTyping || isFetchingMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

