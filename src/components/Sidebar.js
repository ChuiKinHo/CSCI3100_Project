/*
 * -----------------------------
 * File - Sidebar.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: sidebar component
 * -----------------------------
 */
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

  // A function that redirects the user to the specified username page
  function redirect(username) {
    router.push("/" + username);
  }

  // useEffect hook that sets the username and isAdmin state variables based on session storage
  useEffect(() => {
    setUsername(getItem("username", "session"));
    setIsAdmin(getItem("admin", "session"));
  }, [getItem("username", "session"), getItem("admin", "session")]);

  // A function that handles logout
  const handleLogout = () => {
    fetch("/api/auth/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, admin: isAdmin }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data.admin);
        // If the user is an admin, remove the admin key from session storage
        if (json.data.admin) {
          removeItem("admin", "session");
        } else {
          // Otherwise, remove the username, access token, and refresh token keys from session storage
          removeItem("username", "session");
          removeItem("accessToken", "session");
          removeItem("refreshToken", "session");
        }
        // Reset the user info and redirect the user to the home page
        setUserInfo(null);
        router.replace("/");
        return null;
      });
  };

  // useEffect hook that fetches user information from the server based on the username state variable
  useEffect(() => {
    if (username != null) {
      fetch("/api/users?q=@" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data.data);
          isMountedRef.current = true;

          // Return a function that sets the isMountedRef.current flag to false
          return () => {
            isMountedRef.current = false;
          };
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [username]);

  if ((isMountedRef && userInfo != null) || isAdmin) {
    return (
      <div
        className={
          "sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-" +
          (isAdmin ? "0" : "24")
        }
      >
        {/* <h2>{pathname}</h2> */}
        {/* Twitter Logo */}
        <Link href={getItem("admin", "session") ? "/admin" : "/"}>
          <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
            <Image
              width={50}
              height={50}
              src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
              alt="Twitter logo"
            />
          </div>
        </Link>

        {/* If admin is logged in, don't show the sidebar */}
        {isAdmin ? null : (
          <>
            <div className="mt-4 mb-2.5 xl:items-start">
              {/* Home link */}
              <Link href="/">
                {pathname === "/" ? (
                  <SidebarMenuItem text="Home" Icon={HomeIcon} active />
                ) : (
                  <SidebarMenuItem text="Home" Icon={HomeIcon} />
                )}
              </Link>

              {/* Explore link */}
              <Link href="/explore">
                {pathname === "/explore" ? (
                  <SidebarMenuItem text="Explore" Icon={HashtagIcon} active />
                ) : (
                  <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
                )}
              </Link>

              {/* Profile link */}
              {username != null ? (
                <>
                  <Link href={"/" + username}>
                    {pathname === "/[username]" ? (
                      <SidebarMenuItem text="Profile" Icon={UserIcon} active />
                    ) : (
                      <SidebarMenuItem text="Profile" Icon={UserIcon} />
                    )}
                  </Link>
                </>
              ) : null}
            </div>

            {/* User info */}
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

        {/* Logout button */}
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
