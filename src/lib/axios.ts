import toast from "react-hot-toast";
import axios from "axios";

import {
  HTTP_ERROR_CODES,
  LOCALIZED_ERROR_CODES,
  DEFAULT_ERROR_CODES,
} from "@/utils/errorCodes";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token
instance.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");
  try {
    const { accessToken } = JSON.parse(auth || "{}");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (error) {
    console.error(error);
  }
  return config;
});

// Add a response interceptor to handle 401 unauthorized responses
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth");
      window.location.href = "/login";
    }
    if (error.response?.data?.message) {
      const findMessage = Object.values(HTTP_ERROR_CODES).find(
        (message) => message === error.response?.data?.message
      );
      const language: "tr" | "en" =
        (localStorage.getItem("preferred_locale") as "tr" | "en") || "tr";
      if (findMessage) {
        toast.error(
          LOCALIZED_ERROR_CODES[language][
            findMessage as keyof (typeof LOCALIZED_ERROR_CODES)[typeof language]
          ]
        );
      } else {
        toast.error(DEFAULT_ERROR_CODES[language].AN_ERROR_OCCURED);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
