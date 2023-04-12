import {
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
import { sidebarImg } from "../_unsorted/imageRelated/cloudinary/utils";
import { userInfo } from "os";
import { useRef } from "react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = router.pathname;
  const { getItem, removeItem } = useStorage();
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const isMountedRef = useRef(false);

  function redirect(username) {
    router.push("/" + username);
  }

  useEffect(() => {
    setUsername(getItem("username", "session"));
    setIsAdmin(getItem("admin", "session"));
  }, [getItem("username", "session"), getItem("admin", "session")]);

  const handleLogout = () => {
    removeItem("username", "session");
    removeItem("admin", "session");
    setUsername(null);
    setIsAdmin(false);
    router.replace("/");
  };

  useEffect(() => {
    if (username != null) {
      fetch("http://localhost:3000/api/users?q=@" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data.data);
          isMountedRef.current = true;

          return () => {
            isMountedRef.current = false;
          };
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [username]);

  if (isMountedRef && userInfo != null) {
    return (
      <div
        className={
          "sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-" +
          (isAdmin ? "0" : "24")
        }
      >
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

        {isAdmin ? null : ( // If admin is logged in, don't show the sidebar
          <>
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
              {username != null ? (
                <>
                  {/* <SidebarMenuItem text="Notifications" Icon={BellIcon} /> */}
                  <SidebarMenuItem text="Messages" Icon={InboxIcon} />
                  {/* <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} /> */}
                  {/* <SidebarMenuItem text='Lists' Icon={ClipboardIcon} /> */}

                  <Link href={"/" + username}>
                    {pathname === "/[username]" ? (
                      <SidebarMenuItem text="Profile" Icon={UserIcon} active />
                    ) : (
                      <SidebarMenuItem text="Profile" Icon={UserIcon} />
                    )}
                  </Link>
                  {/* <SidebarMenuItem text='More' Icon={EllipsisHorizontalCircleIcon} /> */}
                </>
              ) : null}
            </div>

            {username != null ? (
              <>
                <div className="flex items-center px-4 py-1 cursor-pointer transition duration-500 ease-out ">
                  <button
                    onClick={() => {
                      redirect(userInfo.username);
                    }}
                    className="-ml-3"
                  >
                    {sidebarImg(userInfo)}
                  </button>
                  <span className={`hidden xl:inline`}>
                    {" "}
                    <div className="truncate ml-4 leading-5">
                      <h4
                        className="font-bold hover:underline text-[14px] truncate"
                        onClick={() => {
                          redirect(userInfo.username);
                        }}
                      >
                        {userInfo.name}
                      </h4>
                      <h5 className="text-[13px] text-gray-500 truncate">
                        @{userInfo.username}
                      </h5>
                    </div>
                  </span>
                </div>
              </>
            ) : null}
          </>
        )}

        {username != null || isAdmin ? (
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
}
