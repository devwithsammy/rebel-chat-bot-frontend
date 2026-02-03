"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN_KEY, ACCESS_USER_KEY } from "@src/shared/constants";

export default function AuthCallback() {
  const router = useRouter();
  const [message, setMessage] = useState("Processing login...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the full URL including hash fragment
        const urlParams = new URLSearchParams(window.location.search);

        const accessToken = urlParams.get("token"); //our token key in backend
        const userData = urlParams.get("user");

        if (accessToken && userData) {
          // Store token and user data
          localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
          localStorage.setItem(ACCESS_USER_KEY, userData);

          setMessage("Login successful! Redirecting...");
          router.push("/");
          // go to home page
        } else {
          throw new Error("No access token received");
        }
      } catch (error) {
        console.log("Auth callback error:", error);
        setMessage("Login failed. Redirecting to login...");
        setTimeout(() => router.push("/login"), 3000);
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-8 font-nunito tracking-wide ">
          {message}
        </h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
}
