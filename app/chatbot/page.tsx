"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faTasks,
  faGraduationCap,
  faHeartbeat,
  faLanguage,
  faPlane,
  faFilm,
  faBrain,
  faPiggyBank,
  faBriefcase,
  faUtensils,
  faCalendarAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const chatbots = [
  {
    name: "Alex - ChatBuddy",
    description:
      "Friendly chat support for any topic. Always here to lend an ear.",
    icon: faRobot,
  },
  {
    name: "Taylor - TaskMaster",
    description:
      "Efficient task management, scheduling, and reminders. Let's stay organized.",
    icon: faTasks,
  },
  {
    name: "Emma - EduTutor",
    description:
      "Study help and concept explanations. Helping you excel academically.",
    icon: faGraduationCap,
  },
  {
    name: "Chris - FitGuide",
    description:
      "Motivational fitness and wellness tips. Supporting your health journey.",
    icon: faHeartbeat,
  },
  {
    name: "Sophia - LinguaMate",
    description:
      "Language learning support with practice and pronunciation help.",
    icon: faLanguage,
  },
  {
    name: "Liam - TravelGenie",
    description:
      "Travel recommendations and itinerary tips for your next adventure.",
    icon: faPlane,
  },
  {
    name: "Ella - FunFinder",
    description: "Entertainment suggestions and interactive fun activities.",
    icon: faFilm,
  },
  {
    name: "Ethan - MindMender",
    description:
      "Emotional support with mindfulness and stress relief techniques.",
    icon: faBrain,
  },
  {
    name: "Olivia - FinGuide",
    description:
      "Budgeting, expenses tracking, and financial advice to reach goals.",
    icon: faPiggyBank,
  },
  {
    name: "Ava - CareerCoach",
    description:
      "Career advice, resume building, and interview preparation support.",
    icon: faBriefcase,
  },
  {
    name: "Mia - ChefMate",
    description: "Creative recipe ideas and cooking tips for delicious meals.",
    icon: faUtensils,
  },
  {
    name: "Noah - EventGuru",
    description: "Event planning and organization for memorable gatherings.",
    icon: faCalendarAlt,
  },
];
const Chatbot: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const [selectedChatbot, setSelectedChatbot] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "Alex - ChatBuddy", text: "Hi! How can I assist you today?" },
  ]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    setSelectedChatbot(chatbots[0].name); // Select the first chatbot by default
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat whenever a new message is added
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // If session is still loading, do not render the component
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Redirect to login if there's no user session
  if (!session?.user) {
    router.push("/login");
    return null;
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || isTyping) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "You", text: newMessage },
    ]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate chatbot typing delay
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: selectedChatbot || "Chatbot",
          text: "Here's a response from the chatbot.",
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      {/* Sidebar */}
      <div className="w-1/3 bg-[#31708E] text-white p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold">Hi, {session.user?.name}</h2>
          </div>
          <button
            onClick={() => signOut()}
            className="text-sm font-medium text-white underline flex items-center"
          >
            Logout <FontAwesomeIcon icon={faSignOutAlt} className="ml-2" />
          </button>
        </div>
        <h2 className="text-lg font-bold mb-4">Chatbots</h2>
        <ul className="flex-grow overflow-y-auto">
          {chatbots.map((bot, index) => (
            <li
              key={index}
              className={`p-4 mb-2 rounded cursor-pointer flex items-center ${
                selectedChatbot === bot.name
                  ? "bg-[#5085A5] text-white"
                  : "hover:bg-[#43788c] text-gray-200"
              }`}
              onClick={() => setSelectedChatbot(bot.name)}
            >
              <FontAwesomeIcon icon={bot.icon} className="mr-2" />
              <div>
                <div className="font-bold">{bot.name}</div>
                <div className="text-sm">{bot.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 p-4 flex flex-col h-full bg-white">
        <h3 className="text-lg font-bold mb-4">{selectedChatbot}</h3>
        <div className="flex-grow p-4 rounded shadow-md overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-2 max-w-xs rounded ${
                message.sender === "You"
                  ? "bg-[#8FC1E3] self-end ml-auto"
                  : "bg-[#31708E] text-white self-start mr-auto"
              }`}
            >
              <p>{message.text}</p>
            </div>
          ))}
          {isTyping && (
            <div className="self-start bg-gray-300 text-gray-700 p-2 max-w-xs rounded mb-4 animate-pulse">
              <p className="text-sm italic">Typing...</p>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#31708E]"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 py-2 bg-[#5085A5] text-white rounded hover:bg-[#687864] flex items-center"
            disabled={isTyping}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
