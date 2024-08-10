"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Main: React.FC = () => {
  const router = useRouter();

  router.push("/chatbot");
  return null;
};

export default Main;

