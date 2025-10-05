
"use client" ; 
import { Metadata } from "next";
import Nav from "@ui/organisms/Nav";
import ChatArea from "@src/ui/organisms/ChatArea";
import { Sidebar } from "@src/ui/organisms/Sidebar";
import { defaultMeta } from "@src/shared/meta";



export default function Home() {
  return (
    <div className="grid  grid-cols-[min-content_1fr] h-screen">
      <div className="">
        <Sidebar />
      </div>
      <div className="bg-white">
        <Nav />
        <ChatArea />
      </div>
    </div>
  );
}
