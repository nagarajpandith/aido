import { Mic, SendHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { type AUTHOR, type CONVERSATION_TYPE } from "@prisma/client";

function Chat({ type }: { type: CONVERSATION_TYPE }) {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    {
      type: CONVERSATION_TYPE;
      author: AUTHOR;
      message: string;
    }[]
  >([]);

  const [followUp, setFollowUp] = useState<string[]>([
    "Follow up question 1",
    "Follow up question 2",
    "Follow up question 3",
    "Follow up question 4",
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const getAllMessages = api.conversation.getConversation.useQuery();
  const createMessage = api.conversation.createConversation.useMutation({
    onSuccess: () => {
      setMessage("");
      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
    },
  });

  useEffect(() => {
    if (getAllMessages.isSuccess) {
      setMessages(
        // eslint-disable-next-line
        getAllMessages.data.map((msg) => {
          return {
            type: msg.type,
            author: msg.author,
            message: msg.message,
          };
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllMessages.isSuccess]);

  const createMes = (message: string) => {
    createMessage.mutate({
      type,
      author: "user",
      text: message,
    });
  };

  const handleFollowUpClick = (followUpText: string) => {
    setMessages([
      ...messages,
      {
        type,
        author: "user",
        message: followUpText,
      },
    ]);
    setMessage(followUpText);
    createMes(followUpText);
    setFollowUp([]);
  };

  return (
    <div className="w-[300px] max-w-xl flex-grow overflow-hidden p-1 lg:w-[400px]">
      <div className="mb-4 h-96 overflow-y-auto bg-white text-gray-600 dark:bg-slate-900">
        {(loading || getAllMessages.isLoading) && (
          <div className="flex h-full items-center justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900 dark:border-gray-100"></div>
          </div>
        )}
        {!(loading || getAllMessages.isLoading) &&
          messages.map((msg, index) => (
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
                  __html: msg.message.replace(/\n/g, "<br />"),
                }}
              ></div>
            </div>
          ))}
      </div>

      {followUp.length != 0 && (
        <div className="no-scrollbar overflow-x-auto whitespace-nowrap border-t bg-white py-3 dark:bg-slate-900">
          {followUp.map((followUpText, index) => (
            <span
              key={index}
              onClick={() => handleFollowUpClick(followUpText)}
              className="m-1 inline-block cursor-pointer rounded-lg bg-slate-200 px-3 py-2 text-sm hover:bg-slate-100 dark:bg-slate-600 dark:hover:bg-slate-500"
            >
              {followUpText}
            </span>
          ))}
        </div>
      )}

      <div className="border-t bg-white py-3 dark:bg-slate-900">
        <div className="flex items-center">
          <Textarea
            style={{
              resize: "none",
            }}
            disabled={loading}
            placeholder={loading ? "Loading..." : "Type a message..."}
            className="mr-2 rounded-l-lg border py-2 pr-10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && message.trim() !== "") {
                e.preventDefault();
                setMessages([
                  ...messages,
                  {
                    type,
                    author: "user",
                    message,
                  },
                ]);
                createMes(message);
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
                  setMessages([
                    ...messages,
                    {
                      type,
                      author: "user",
                      message,
                    },
                  ]);
                  createMes(message);
                }
              }}
              disabled={message.length === 0 || loading}
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
