import Head from "next/head";
import Link from "next/link";
import { MainNav } from "~/components/navbar";
import { Button } from "~/components/ui/button";
import { MessagesSquare } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

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
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
          <h1 className="flex items-center gap-2">
            Welcome, {session?.user?.name ?? "Guest, Please Login to continue"}!{" "}
            {session && (
              <Image
                src={session?.user.image ?? "/logo.png"}
                width={30}
                height={30}
                className="rounded-full"
                alt="User Image"
              />
            )}
          </h1>
          <Link href={session ? "/query" : "/api/auth/signin"}>
            <Button disabled={!session}>
              <MessagesSquare className="mr-2" />
              Chat with Aido
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
