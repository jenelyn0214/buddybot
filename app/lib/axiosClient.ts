// lib/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000", // Adjust base URL as needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally, you can add interceptors
axiosClient.interceptors.request.use(
  (config) => {
    // You can add a token or any other custom headers here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;

