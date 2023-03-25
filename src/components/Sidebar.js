import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsHorizontalIcon,
  EllipsisHorizontalCircleIcon,
  HashtagIcon,
  HomeIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useStorage from "../hooks/useStorage";
import SidebarMenuItem from "./SidebarMenuItem";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = router.pathname;
  const [username, setUsername] = useState(null);
  useEffect(() => setUsername(getItem("username", "session")), []);
  const { getItem, removeItem } = useStorage();
  const handleLogout = () => {
    removeItem("username", "session");
    router.replace("/");
  };

  return (
    <div className=" sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      {/* <h2>{pathname}</h2> */}
      {/* Twitter Logo */}
      <Link href="/">
        <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
          <Image
            width={50}
            height={50}
            src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
            alt="Twitter logo"
          />
        </div>
      </Link>

      <div className="mt-4 mb-2.5 xl:items-start">
        {/* TODO:: dark theme, log out, other stuff on the sidebar */}
        <Link href="/">
          {pathname === "/" ? (
            <SidebarMenuItem text="Home" Icon={HomeIcon} active />
          ) : (
            <SidebarMenuItem text="Home" Icon={HomeIcon} />
          )}
        </Link>

        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        {/* <SidebarMenuItem text="Notifications" Icon={BellIcon} /> */}
        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
        {/* <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} /> */}
        {/* <SidebarMenuItem text='Lists' Icon={ClipboardIcon} /> */}

        <Link href="/testUsername">
          {pathname === "/[username]" ? (
            <SidebarMenuItem text="Profile" Icon={UserIcon} active />
          ) : (
            <SidebarMenuItem text="Profile" Icon={UserIcon} />
          )}
        </Link>
        {/* <SidebarMenuItem text='More' Icon={EllipsisHorizontalCircleIcon} /> */}
      </div>
      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
        Tweets
      </button>

      {username != null ? (
        <div className="absolute bottom-0">
          <button
            className="flex bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 mb-3"
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
