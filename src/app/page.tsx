import { Metadata } from "next";
import Nav from "@ui/organisms/Nav";


export const metadata:Metadata = {
  title: "Rebel Chat Bot",
  description: "An AI-powered chat bot that helps you rebel against the status quo.",
};

export default function Home() {
  return (
    <div className="">
     <div className="text-3xl font-bold bg-accent-500 underline  dark:text-(--c-foreground)">
      <Nav />
     home page 
     </div>

    </div>
  );
}
