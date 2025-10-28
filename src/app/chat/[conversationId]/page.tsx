"use client";
import Nav from "@ui/organisms/Nav";
import ChatArea from "@src/ui/organisms/ChatArea";

import { useParams } from "next/navigation";

import { ChatLayout } from "@src/ui/templates/ChatLayout";

export default function Page() {
  const params = useParams(); // ✅
  const conversationId = params?.conversationId as string;

  return (
    <ChatLayout>
      <Nav />
      <ChatArea {...{ conversationId }} />
    </ChatLayout>
  );
}
