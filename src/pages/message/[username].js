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
        </div>
        <Widget
          onStateChange={handleChildStateChange}
          checkFol={parentFolAction}
        />
      </>
    );
  }
}
