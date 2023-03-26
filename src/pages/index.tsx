import Head from "next/head";
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widget from "../components/Widget";
import useStorage from "../hooks/useStorage";
import { useEffect, useState } from "react";
import users from "@/data/sampleUsers.json";
import Search from "@/components/Search";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { getItem } = useStorage();
  const [username, setUsername] = useState(null);
  const user = users.find((user) => user.username === username);
  useEffect(
    () => setUsername(getItem("username", "session")),
    [getItem("username", "session")]
  );
  return username != null ? (
    <>
      <Feed />
      <Widget />
    </>
  ) : (
    <>
      <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex py-2 px-3 sticky top-0  bg-white border-gray-200">
          <Search />
        </div>
      </div>
      <div className="xl:w-[600px] hidden lg:inline ml-4 space-y-4 py-5">
        <div>
          <Link href="/i/login">
            <button className="flex bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95">
              Login
            </button>
          </Link>
        </div>
        <div>
          <Link href="/i/signup">
            <button className="flex bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
