import Head from "next/head";
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widget from "../components/Widget";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Feed />
      <Widget />
    </>
  );
}
