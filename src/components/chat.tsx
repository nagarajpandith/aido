import { Mic, SendHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";

interface Message {
  author: string;
  content: string;
  timestamp: string;
}

function Chat() {
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
    <div className="max-w-xl w-[300px] lg:w-[400px] flex-grow overflow-hidden p-1">
      <div className="mb-4 h-96 overflow-y-auto bg-white text-gray-600 dark:bg-slate-900">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.author === "user" ? "justify-end" : "justify-start"
            } mt-2`}
          >
            <div
              className={`${
                msg.author === "user"
                  ? "self-end bg-blue-600 text-white"
                  : "self-start bg-gray-200 text-gray-800"
              } max-w-[70%] rounded-lg p-2`}
              dangerouslySetInnerHTML={{
                __html: msg.content.replace(/\n/g, "<br />"),
              }}
            ></div>
          </div>
        ))}
      </div>

      <div className="border-t bg-white pt-3 dark:bg-slate-900">
        <div className="flex items-center">
          <Textarea
            style={{
              resize: "none",
            }}
            placeholder="Type here..."
            className="mr-2 rounded-l-lg border py-2 pr-10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && message.trim() !== "") {
                e.preventDefault();
                sendDummyMessage(message);
              }
            }}
          />
          <div className="flex flex-col space-y-1">
            <Button>
              <Mic className="h-5 w-5" />
            </Button>
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
    </div>
  );
}

export default Chat;
