"use client";

import { useEffect } from "react";
import { FaRedoAlt } from "react-icons/fa";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.log("Chatbot Error:", error);
  }, [error]);

  const handleRefresh = () => {
    try {
      reset?.(); // Built-in reset from Next.js
    } catch (e) {
      console.log("Error resetting page:", e);
    }
    window.location.reload(); // fallback hard reload
  };

  return (
    <div className="min-h-dvh font-nunito flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900  text-zinc-800 dark:text-gray-200 px-6 text-center">
      <h2 className="text-3xl font-semibold mb-3 dark:text-white  tracking-wide">
        Something went wrong 😔
      </h2>
      <p className="dark:text-gray-400 text-gray-900 max-w-md mb-6 tracking-wide">
        The chatbot ran into an unexpected error. Please refresh and try again.
      </p>

      <button
        onClick={handleRefresh}
        className="flex cursor-pointer items-center gap-2 bg-primary-600 hover:bg-primary-700 px-5 py-2.5 rounded-xl font-medium text-white shadow-lg transition"
      >
        <FaRedoAlt className="text-sm" />
        Refresh
      </button>

      <div className="mt-8 text-sm text-gray-700 dark:text-gray-500">
        We are working to fix this
      </div>
    </div>
  );
}
