import Head from "next/head";
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widget from "../components/Widget";
import useStorage from "../hooks/useStorage";
import { useEffect, useState } from "react";
import Search from "@/components/Search";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { getItem } = useStorage();
  const [username, setUsername] = useState("");
  useEffect(
    () => setUsername(getItem("username", "session")),
    [getItem("username", "session")]
  );

  const [childState, setChildState] = useState(0);
  const handleChildStateChange = () => {
    if (childState !== null) setChildState(childState + 1);
    else setChildState(0);
  };

  return username ? (
    <>
      <Feed />
      <Widget
        onStateChange={handleChildStateChange}
        checkFol={() => {}}
        explore={false}
      />
    </>
  ) : (
    <>
      <div className="xl:ml-370 border-l border-r border-gray-200 xl:min-w-576 sm:ml-73 flex-grow max-w-xl">
        <div className="sticky top-0 bg-white border-gray-200">
          <div className="flex py-2 px-3">
            <h1>Welcome to Twitter! Sign up or Login to continue</h1>
            <Image
              width={1000}
              height={1000}
              src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
              alt="Twitter logo"
            />
          </div>
        </div>
      </div>

      <div className=" lg:inline ml-4 space-y-4 py-5">
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
