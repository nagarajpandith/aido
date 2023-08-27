import Head from "next/head";
import Link from "next/link";
import { MainNav } from "~/components/navbar";
import { Button } from "~/components/ui/button";
import { Bot, HeartPulse, MessagesSquare, PersonStanding } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  const features = [
    {
      icon: <Bot size={50} />,
      featureName: "Reliable Bot for Personal Medical Queries",
      shortDescription:
        "Access a reliable bot to answer personal medical queries and provide citations from trusted sources.",
    },
    {
      icon: <HeartPulse size={50} />,
      featureName: "Mental Health Support and Coping Strategies",
      shortDescription:
        "Receive mental health support through coping strategies, relaxation techniques, and personal companionship.",
    },
    {
      icon: <PersonStanding size={50} />,
      featureName: "Personalised 3D Characters & Voice Support",
      shortDescription:
        "Experience personalization with animated 3D characters and local language voice support.",
    },
  ];

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
      <main className="min-h-screen">
        <MainNav />
        <div className="h-screen flex w-screen flex-col items-center justify-center gap-10">
          <h1 className="flex items-center gap-2 text-3xl">
            Welcome, {session?.user?.name ?? "Guest, Please Login to continue"}!{" "}
            {session && (
              <Image
                src={session?.user.image ?? "/logo.png"}
                width={40}
                height={40}
                className="rounded-full"
                alt="User Image"
              />
            )}
          </h1>
          <div className="space-x-5">
            <Link href={session ? "/query" : "/api/auth/signin"}>
              <Button disabled={!session}>
                <MessagesSquare className="mr-2" />
                Ask Aido
              </Button>
            </Link>

            <Link href={session ? "/support" : "/api/auth/signin"}>
              <Button disabled={!session}>
                <MessagesSquare className="mr-2" />
                Talk to Aido
              </Button>
            </Link>
          </div>

          <h1 className="text-center text-3xl font-bold mt-5">Features</h1>
          <div className="flex flex-wrap justify-center gap-5">
            {features.map((feature) => (
              <div
                className="flex max-w-md items-start justify-center gap-5 rounded-lg border-black bg-slate-200 p-5 dark:bg-slate-900 md:flex-row"
                key={feature.featureName}
              >
                <div>{feature.icon}</div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl lg:text-2xl font-bold">{feature.featureName}</h2>
                  <p className="text-sm lg:text-md text-gray-500">{feature.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
