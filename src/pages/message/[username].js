import { useRouter } from "next/router";
import Post from "@/components/Post";
import Widget from "@/components/Widget";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useStorage from "@/hooks/useStorage";
import { userImgProfile } from "../../_unsorted/imageRelated/cloudinary/utils";
import Link from "next/link";

export default function userPage() {
  const { getItem } = useStorage();
  const [loginUsername, setLoginUsername] = useState(null);
  const [followed, setFollowed] = useState(null);
  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    usrImg: "",
    following: [],
    follower: [],
    mytweets: [],
  });
  const [loginUserInfo, setLoginInfo] = useState({
    username: "",
    name: "",
    usrImg: "",
    following: [],
    follower: [],
    mytweets: [],
  });
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const username = router.query.username;
  const [parentFolAction, setParentFolAction] = useState(null);
  const [childState, setChildState] = useState(0);
  const handleChildStateChange = () => {
    if (childState !== null) setChildState(childState + 1);
    else setChildState(0);
    //console.log(childState);
  };
  useEffect(() => {
    if (username) {
      fetch("/api/users?q=@" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (
            data.data !== undefined &&
            data.data !== null &&
            data.data.length != 0
          ) {
            setUserInfo(data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [username, childState, parentFolAction]);

  useEffect(() => {
    if (username) {
      fetch("/api/users?q=@" + loginUsername, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (
            data.data !== undefined &&
            data.data !== null &&
            data.data.length != 0
          ) {
            setLoginInfo(data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [username, childState, parentFolAction]);

  useEffect(() => {
    setLoginUsername(getItem("username", "session"));
  }, [getItem("username", "session")]);

  useEffect(() => {
    if (userInfo.username !== loginUsername) {
      setFollowed(
        userInfo.follower
          .map((follower) => follower.username)
          .includes(loginUsername)
      );
    } else {
      setFollowed(null);
    }
  }, [userInfo]);

  function goBack() {
    router.back();
  }
  if (userInfo.username === "") {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <ArrowLeftIcon
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
              onClick={() => goBack()}
            />
            <div
              style={{ height: "50px", width: "50px" }}
              className="md rounded-full relative avatar"
            >
              <div className="absolute"> {userImgProfile(userInfo)}</div>
            </div>
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer ml-3">
              {userInfo.name}
            </h2>
          </div>
          <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
            <div
              id="messages"
              class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            >
              <div class="chat-message">
                <div class="flex items-end">
                  <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div>
                      <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                        Thanks for your message David. I thought I'm alone with
                        this issue. Please, ? the issue to support it :)
                      </span>
                    </div>
                  </div>
                  <div
                    style={{ height: "50px", width: "50px" }}
                    className="w-6 h-6 rounded-full order-1 "
                  >
                    {userImgProfile(userInfo)}
                  </div>
                </div>
              </div>
              <div class="chat-message">
                <div class="flex items-end justify-end">
                  <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                    <div>
                      <span class="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white">
                        Are you using sudo?
                      </span>
                    </div>
                  </div>

                  <div
                    style={{ height: "50px", width: "50px" }}
                    className="w-6 h-6 rounded-full order-2 "
                  >
                    {userImgProfile(loginUserInfo)}
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <div class="relative flex">
                <input
                  type="text"
                  placeholder="Write your message!"
                  class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md "
                />
                <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                  >
                    <span class="font-bold">Send</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="h-6 w-6 ml-2 transform rotate-90"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Widget
          onStateChange={handleChildStateChange}
          checkFol={parentFolAction}
        />
      </>
    );
  }
}
