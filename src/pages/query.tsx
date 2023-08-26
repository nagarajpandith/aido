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

export default function Home() {
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
          {/* Character Render */}
        </div>
        <div className="fixed bottom-4 right-4">
          <Popover>
            <PopoverTrigger>
              <Button>
                <MessageSquare className="mr-2 h-5 w-5" /> Text Aido
              </Button>
            </PopoverTrigger>
            <PopoverContent className="mb-2 w-full bg-white dark:bg-slate-900">
              <Chat type="Query"/>
            </PopoverContent>
          </Popover>
        </div>
      </main>
    </>
  );
}
