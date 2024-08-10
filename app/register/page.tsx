"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import axiosClient from "../lib/axiosClient";
import { HttpStatusCode } from "axios";

const Register: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");
    setIsLoading(true);

    // Send user data to your backend for account creation
    const res = await axiosClient.post("/api/register", {
      nickname,
      email,
      password,
    });

    if (
      res.status === HttpStatusCode.Ok ||
      res.status === HttpStatusCode.Created
    ) {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        router.push("/chatbot");
      } else {
        setErrorText("Login failed. Please try to log in manually.");
      }
    } else {
      setErrorText("Registration failed. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="nickname">
              Nickname
            </label>
            <div className="flex items-center border rounded p-2">
              <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
              <input
                type="text"
                id="nickname"
                className="w-full outline-none"
                placeholder="Enter your nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border rounded p-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-400 mr-2"
              />
              <input
                type="email"
                id="email"
                className="w-full outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border rounded p-2">
              <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
              <input
                type="password"
                id="password"
                className="w-full outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {errorText && (
            <div className="text-red-400 text-sm text-center mb-2">
              {errorText}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login">
              <span className="text-blue-600 hover:text-blue-700 font-medium">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

