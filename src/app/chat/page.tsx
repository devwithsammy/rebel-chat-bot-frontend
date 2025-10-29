"use client";
import Nav from "@ui/organisms/Nav";
import ChatArea from "@src/ui/organisms/ChatArea";

import { ChatLayout } from "@src/ui/templates/ChatLayout";

export default function Page() {
  return (
    <ChatLayout>
      <Nav />
      <ChatArea />
    </ChatLayout>
  );
}
