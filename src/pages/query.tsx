import Head from "next/head";
import { MainNav } from "~/components/navbar";
import Chat from "~/components/chat";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { Button } from "~/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Avatar from "src/components/3d/avatar1";
import axios from "axios";
import { use, useEffect, useState } from "react";
interface MessageQueue {
  lipSync: object;
  audio: HTMLAudioElement;
}
export default function Home() {
  const groupConfig = {
    position: [0, -3, 5],
    scale: 2,
  };
  const [messageQueue, setMessageQueue] = useState<MessageQueue[]>([]);
  const botConversationTrigger = async (msg: string) => {
    const url = `/api/speech?text=${encodeURIComponent(msg)}`;
    const blob = await (await fetch(url)).blob();
    const audio = new Audio(URL.createObjectURL(blob));
    const formData = new FormData();
    formData.append("audio", new Blob([blob], { type: "audio/mpeg" }));

    const { data } = await axios.post(
      "https://vertexai-api-ar2ndw3szq-uc.a.run.app/convertToSpeech",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setMessageQueue((prev) => [{ lipSync: data, audio: audio }, ...prev]);
  };

  const [currentMessage, setCurrentMessage] = useState<MessageQueue | null>(
    null
  );

  useEffect(() => {
    if (!currentMessage && messageQueue.length > 0) {
      const { audio, lipSync } = messageQueue[0]!;
      setCurrentMessage({ audio, lipSync });

      audio.addEventListener("ended", () => {
        setCurrentMessage(null);
        setMessageQueue((prev) => prev.slice(1));
      });
    }
    if (
      currentMessage?.audio &&
      currentMessage.audio.ended &&
      messageQueue.length > 0
    ) {
      const { audio, lipSync } = messageQueue[0]!;
      setCurrentMessage({ audio, lipSync });
      audio.addEventListener("ended", () => {
        setCurrentMessage(null);
        setMessageQueue((prev) => prev.slice(1));
      });
    }
  }, [messageQueue]);

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
      <main className="relative flex min-h-screen flex-col">
        <div>
          <Canvas shadows camera={{ position: [0, 0, 8], fov: 43 }}>
            <color attach="background" args={["#ececec"]} />
            <OrbitControls />
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <Avatar currentMessage={currentMessage} groupConfig={groupConfig} />
            <Environment preset="apartment" />
            <Scean />
          </Canvas>
        </div>
        <div className="absolute left-0 top-0 w-full">
          <MainNav />
          <div className="flex-grow overflow-y-auto p-5">
            <h1 className="text-center text-xl font-bold text-gray-900 dark:text-gray-100 lg:text-3xl">
              Your Reliable Medical Query Assistant
            </h1>
            <p className="lg:text-md text-center text-xs font-light text-gray-900 dark:text-gray-100">
              Providing Accurate Answers and Citing Trusted Source
            </p>
          </div>
          <div className="fixed bottom-4 right-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button>
                  <MessageSquare className="mr-2 h-5 w-5" /> Text Aido
                </Button>
              </PopoverTrigger>
              <PopoverContent className="mb-2 w-full bg-white dark:bg-slate-900">
                <Chat
                  type="Query"
                  botConversationTrigger={botConversationTrigger}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </main>
    </>
  );
}

const Scean = () => {
  const viewport = useThree((state) => state.viewport);
  const texture = useTexture("/assets/textures/background1.jpg");
  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};
