import Head from "next/head";
import { MainNav } from "~/components/navbar";
import { SendHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";

interface Message {
  author: string;
  content: string;
  timestamp: string;
}

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (author: string, content: string) => {
    const newMessage: Message = {
      author,
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const sendDummyMessage = (message: string) => {
    addMessage("user", message);
    setMessage("");
    setTimeout(() => {
      addMessage("bot", "I'm here to help!");
    }, 500);
  };

  return (
    <>
      <Head>
        <title>Aido - Chat</title>
        <meta
          name="description"
          content="Your all-in-one solution for personalized health recommendations, reliable medical insights, mental health support, and interactive 3D character guidance. Available in local languages for a truly personalized experience."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col">
        <MainNav />
        <div className="flex-grow overflow-y-auto p-5">
          <div className="mb-4 text-gray-600">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex justify-${
                  msg.author === "user" ? "end" : "start"
                } mt-2`}
              >
                <div
                  className={`${
                    msg.author === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  } max-w-md rounded-lg p-2`}
                  dangerouslySetInnerHTML={{
                    __html: msg.content.replace(/\n/g, "<br />"),
                  }}
                ></div>
              </div>
            ))}
          </div>

          <div className="fixed bottom-0 left-0 w-full border-t  p-5">
            <div className="flex items-center">
              <Textarea
                placeholder="Type your message here"
                className="mr-2 rounded-l-lg border py-2 pr-10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    message.trim() !== ""
                  ) {
                    e.preventDefault();
                    sendDummyMessage(message);
                  }
                }}
              />
              <Button
                onClick={() => {
                  if (message.trim() !== "") {
                    sendDummyMessage(message);
                  }
                }}
                disabled={message.length === 0}
              >
                <SendHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
