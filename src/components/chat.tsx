import { Mic, SendHorizontal, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { type AUTHOR, type CONVERSATION_TYPE } from "@prisma/client";

import { setCORS } from "google-translate-api-browser";
const translate = setCORS("https://cors-proxy.fringe.zone/");

function Chat({
  type,
  botConversationTrigger,
}: {
  type: CONVERSATION_TYPE;
  botConversationTrigger: (msg: string) => void;
}) {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    {
      type: CONVERSATION_TYPE;
      author: AUTHOR;
      message: string;
    }[]
  >([]);

  const [followUp, setFollowUp] = useState<string[]>([]);

  const getAllMessages = api.conversation.getConversation.useQuery();
  const createMessage = api.conversation.createConversation.useMutation({
    onSuccess: () => {
      setMessage("");
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
  }, [getAllMessages.isSuccess]);

  const createMes = (message: string, author: AUTHOR) => {
    createMessage.mutate({
      type,
      author: author,
      text: message,
    });
  };

  const handleFollowUpClick = async (followUpText: string) => {
    setMessages((prev) => [
      ...prev,
      {
        type,
        author: "user",
        message: followUpText,
      },
    ]);
    await sendToApi({ message: followUpText, isFollowUp: false });
    setMessage(followUpText);
    createMes(followUpText, "user");
    setFollowUp([]);
    await sendToApi({
      message:
        "generate a list of possible follow up questions that the current user might come up with. Each item in the list should start with an asterisk.",
      isFollowUp: true,
    });
  };

  const handleSendToApi = async () => {
    try {
      await sendToApi({ message, isFollowUp: false });

      await sendToApi({
        message:
          "for the below message what can be the follow-up questions, give a list of possible questions that a user might come up with. Each item in the list should start with an asterisk." +
          messages[messages.length - 1]!.message,
        isFollowUp: true,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendToApi = async ({
    message,
    isFollowUp,
  }: {
    message: string;
    isFollowUp: boolean;
  }) => {
    const context =
      "You are 'Aido,' a personal intelligent healthcare advisor. Your primary role is to provide accurate and reliable information in response to personal medical queries. You are knowledgeable about various medical topics and can offer advice based on trusted sources. When responding to queries, make sure to cite reliable sources that users can refer to for verification. For example, if a user asks, 'What are some common symptoms of a cold?' you can respond with: 'Hello! Common symptoms of a cold include a runny or stuffy nose, sneezing, sore throat, and mild body aches. You can verify this information from reputable sources such as the Centers for Disease Control and Prevention (CDC) or the Mayo Clinic.' Feel free to use authoritative medical sources such as medical journals, official health organizations, and well-known medical websites to back up your responses. Remember to prioritize accuracy, empathy, and the well-being of the users seeking medical information.";
    const followUpContext =
      "Consider the previous question asked by the user and generate a list of possible follow-up questions that the current user might come up with. Each item in the list should start with an asterisk.";

    try {
      const response = await fetch(
        `https://vertexai-api-ar2ndw3szq-uc.a.run.app/${type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            context: isFollowUp ? followUpContext : context,
            history: messages.map((msg) => {
              return {
                author: msg.author,
                message: msg.message,
              };
            }),
          }),
        }
      );

      const text = await response.text();

      if (isFollowUp) {
        setFollowUp(
          text
            .trim()
            .split("\n")
            .map((question) => question.trim().substring(2))
        );
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type,
            author: "bot",
            message: text,
          },
        ]);
        createMes(JSON.stringify(text), "bot");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current)
      (messagesEndRef.current as HTMLDivElement).scrollIntoView({
        behavior: "auto",
      });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, getAllMessages.isSuccess, createMessage.isSuccess]);

  const socketRef = useRef<WebSocket | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [transcript, setTranscript] = useState<string[]>([]);
  [];

  async function transcribe() {
    console.log("Started transcription");
    await navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        if (!MediaRecorder.isTypeSupported("audio/webm"))
          return alert("Browser not supported");
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });

        const webSocketUrl =
          selectedLanguage === "en-US"
            ? "wss://api.deepgram.com/v1/listen?model=nova"
            : `wss://api.deepgram.com/v1/listen?language=${selectedLanguage}` +
              selectedLanguage;

        const socket = new WebSocket(webSocketUrl, [
          "token",
          process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY!,
        ]);

        socket.onopen = () => {
          console.log({ event: "onopen" });
          mediaRecorder.addEventListener("dataavailable", (event) => {
            if (event.data.size > 0 && socket.readyState === 1) {
              socket.send(event.data);
            }
          });
          mediaRecorder.start(1000);
        };

        socket.onmessage = (message) => {
          const received = message && JSON.parse(message?.data as string);
          const transcript = received.channel?.alternatives[0]
            .transcript as string;
          setTranscript((prev) => {
            if (!prev.some((item) => item === transcript)) {
              return [...prev, transcript];
            }
            return prev;
          });
        };

        socket.onclose = () => {
          console.log({ event: "onclose" });
        };

        socket.onerror = (error) => {
          console.log({ event: "onerror", error });
        };

        socketRef.current = socket;
      });
  }

  useEffect(() => {
    if (isRecording) {
      console.log(transcript, "dusfh");

      setMessage("");
      // eslint-disable-next-line
      transcribe();
    } else {
      console.log(transcript);
      setMessage(transcript.join(" "));
      setTranscript([]);
    }
  }, [isRecording]);

  return (
    <div className="w-[300px] max-w-xl flex-grow overflow-hidden p-1 lg:w-[400px]">
      <div className="mb-4 h-96 overflow-y-auto bg-white text-gray-600 dark:bg-slate-900">
        {(getAllMessages.isLoading || createMessage.isLoading) && (
          <div className="flex h-full items-center justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900 dark:border-gray-100"></div>
          </div>
        )}
        {!(getAllMessages.isLoading || createMessage.isLoading) &&
          messages
            .filter((msg) => msg.type === type)
            .map((msg, index) => (
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
        <div ref={messagesEndRef} />
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
            disabled={getAllMessages.isLoading || createMessage.isLoading}
            placeholder={
              getAllMessages.isLoading || createMessage.isLoading
                ? "Loading..."
                : "Type a message..."
            }
            className="mr-2 rounded-l-lg border py-2 pr-10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && !e.shiftKey && message.trim() !== "") {
                e.preventDefault();
                setMessages((prev) => [
                  ...prev,
                  {
                    type,
                    author: "user",
                    message,
                  },
                ]);
                createMes(message, "user");
                await handleSendToApi();
              }
            }}
          />
          <div className="flex flex-col space-y-1">
            <Button
              onClick={async () => {
                if (isRecording) {
                  socketRef.current?.close(),
                    await navigator.mediaDevices
                      .getUserMedia({ audio: true })
                      .then((stream) => {
                        stream.getTracks().forEach((track) => track.stop());
                      });
                  setIsRecording(false);
                } else {
                  setIsRecording(true);
                }
              }}
            >
              {isRecording ? (
                <X className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
            <Button
              onClick={async () => {
                if (message.trim() !== "") {
                  setMessages((prev) => [
                    ...prev,
                    {
                      type,
                      author: "user",
                      message,
                    },
                  ]);
                  createMes(message, "user");
                  await sendToApi({ message, isFollowUp: false });
                }
              }}
              disabled={
                message.length === 0 ||
                getAllMessages.isLoading ||
                createMessage.isLoading
              }
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
