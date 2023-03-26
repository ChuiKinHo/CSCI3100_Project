import Head from "next/head";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/twitter.ico" />
      </Head>

      <header className="flex mx-auto">
        <Sidebar />
      </header>

      <main className="flex min-h-screen mr-auto ml-16 sm:ml-auto">
        {children}
      </main>
    </div>
  );
}
