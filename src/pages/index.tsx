import Head from "next/head";
import Link from "next/link";
import { MainNav } from "~/components/navbar";
import { Button } from "~/components/ui/button";
import { MessagesSquare } from "lucide-react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Aido - Your Healthcare Ally</title>
        <meta
          name="description"
          content="Your all-in-one solution for personalized health recommendations, reliable medical insights, mental health support, and interactive 3D character guidance. Available in local languages for a truly personalized experience."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col">
        <MainNav />
        <div className="my-auto flex justify-center">
          <Link href={"/chat"}>
            <Button>
              <MessagesSquare className="mr-2" />
              Chat with Aido
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
