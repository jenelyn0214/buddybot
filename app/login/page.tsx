"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Assuming you are using Next.js for navigation

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log("result", result);

    if (result?.ok) {
      router.push("/chatbot");
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">BuddyBot Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border rounded p-2">
              <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
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
          {isError && (
            <div className="text-red-400 text-sm text-center mb-2">
              Login failed. Please check your credentials.
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/register">
              <span className="text-blue-600 hover:text-blue-700 font-medium">
                Register
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

