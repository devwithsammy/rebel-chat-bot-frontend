"use client";
import { FcGoogle } from "react-icons/fc";
import { ContinueWithCta } from "@src/ui/atoms/authButtons";

import { useAuth } from "@src/contexts/AuthContext";
import { useSearchParams } from "next/navigation";

export function AuthTemplate() {
  const { loginWithGoogle } = useAuth();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="w-dvw h-dvh py-[10vh] px-[5%] flex items-center justify-center bg-slate-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
      <div className="md:w-[500px] w-[90%] shadow-sm border-1 border-neutral-200 dark:border-neutral-700/50 dark:shadow-zinc-700/50 p-8 py-16 rounded-[30px] flex flex-col items-center ">
        <h4 className="w-fit uppercase font-nunito font-bold tracking-[.15em]  text-primary-600 rounded-full text-lg">
          {process.env.NEXT_PUBLIC_APP_NAME} 😒
        </h4>
        <h4 className="font-nunito tracking-wide text-lg md:text-2xl text-center my-8">
          Log in or sign up
        </h4>

        <div className="flex flex-col items-center font-nunito ">
          <ContinueWithCta
            {...{
              label: "Continue with google",
              Icon: FcGoogle,
              handler: () => loginWithGoogle(),
            }}
          />
          {/* 
          TODO 
          <p className="font-semibold tracking-wide text-sm mb-2 mt-8">OR</p>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder={"Enter email for OTP"}
              className="w-full max-w-[250px] text-base focus:outline-none resize-none bg-transparent max-h-40 overflow-y-auto font-nunito ring-1 ring-slate-400/10 py-3 px-6 rounded-[30px] focus:ring-slate-500/50 text-gray-700 dark:text-slate-200 tracking-wider"
            />
            <ContinueWithCta
              {...{
                label: "Continue ",
                handler: () => console.log("clicked continue with email"),
              }}
            />
          </div> */}
        </div>
        {error && (
          <div className="my-4 bg-red-100  text-red-700 px-4 py-3 rounded-[30px] font-nunito tracking-wide">
            {error === "auth_failed" &&
              "Authentication failed. Please try again."}
            {error === "no_data" && "No user data received. Please try again."}
            {error === "no_user" && "No user information received from Google."}
          </div>
        )}
      </div>
    </div>
  );
}
