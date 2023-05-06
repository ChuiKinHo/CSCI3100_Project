/*
 * -----------------------------
 * File - index.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: The page for user profile
 * -----------------------------
 */
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
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const username = router.query.username;
  const [parentFolAction, setParentFolAction] = useState(null);
  const [childState, setChildState] = useState(0);
  const handleChildStateChange = () => {
    if (childState !== null) setChildState(childState + 1);
    else setChildState(0);
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

  const handleFol = () => {
    if (loginUsername !== userInfo) {
      fetch(
        "/api/follow?username=" +
          loginUsername +
          "&target=" +
          userInfo.username,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data !== null && data.success) {
            setFollowed(true);
            setParentFolAction({
              username: username,
              followed: true,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  };
  const handleUnfol = () => {
    if (loginUsername !== userInfo) {
      fetch(
        "/api/follow?username=" +
          loginUsername +
          "&target=" +
          userInfo.username,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data !== null && data.success) {
            setFollowed(false);
            setParentFolAction({
              username: username,
              followed: false,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  };

  function goBack() {
    router.back();
  }
  if (userInfo.username === "") {
    return <div>Loading...</div>;
  } else {
    return (
      //display all comment tweets
      <>
        <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <ArrowLeftIcon
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
              onClick={() => goBack()}
            />
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer ml-3">
              {userInfo.name}
            </h2>
          </div>

          <div>
            <div className="w-full bg-cover bg-no-repeat bg-center"></div>
            <div className="p-4">
              <div className="relative flex w-full">
                <div className="flex flex-1">
                  <div>
                    <div
                      style={{ height: "100px", width: "100px" }}
                      className="md rounded-full relative avatar"
                    >
                      <div className="absolute">
                        {" "}
                        {userImgProfile(userInfo)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col text-right">
                  {followed === null ? (
                    ""
                  ) : followed ? (
                    <button
                      className="ml-auto bg-white text-black border rounded-full text-sm px-3.5 py-1.5 font-bold hover:bg-red-300"
                      onClick={handleUnfol}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold"
                      onClick={handleFol}
                    >
                      Follow
                    </button>
                  )}
                  {followed !== null ? (
                    <button
                      className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold my-10"
                      onClick={() => {
                        router.push(`/message/${username}/`);
                      }}
                    >
                      Message
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="space-y-1 justify-center w-full mt-3 ml-3">
                <div>
                  <h2 className="text-xl leading-6 font-bold text-black">
                    {userInfo.name}
                  </h2>
                  <p className="text-sm leading-5 font-medium text-gray-600">
                    @{userInfo.username}
                  </p>
                </div>
                <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
                  <Link
                    href={"/" + userInfo.username + "/following/"}
                    className="text-center pr-3 hover:underline"
                  >
                    <span className="font-bold text-black">
                      {userInfo.following.length}
                    </span>
                    <span className="text-gray-600"> Following</span>
                  </Link>
                  <Link
                    href={"/" + userInfo.username + "/follower/"}
                    className="text-center px-3 hover:underline"
                  >
                    <span className="font-bold text-black">
                      {userInfo.follower.length}{" "}
                    </span>
                    <span className="text-gray-600"> Followers</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <nav className="flex flex-row sm:justify-center space-x-4 border-t border-gray-200 bg-slate-50">
              <p className="px-3 py-2 text-slate-700 font-medium">Tweets</p>
            </nav>

            {userInfo.mytweets.map((tweet) => (
              <Post key={tweet.id} id={tweet.id} />
            ))}
          </div>
        </div>
        <Widget
          onStateChange={handleChildStateChange}
          checkFol={parentFolAction}
          explore={false}
        />
      </>
    );
  }
}
