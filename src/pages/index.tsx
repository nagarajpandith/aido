import Head from "next/head";
import { MainNav } from "~/components/navbar";

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
        <MainNav/>
      </main>
    </>
  );
}
