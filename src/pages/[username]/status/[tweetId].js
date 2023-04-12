import {
  ChatBubbleBottomCenterTextIcon,
  EllipsisHorizontalCircleIcon,
  ArrowPathRoundedSquareIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  HandThumbUpIcon as HandThumbUpIconSolid,
  HandThumbDownIcon as HandThumbDownIconSolid,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

import React, { useState } from "react";
import Retweet from "@/components/Retweet";
import { useEffect } from "react";

import TweetPost from "@/components/TweetPost";
import Widget from "@/components/Widget";
import Post from "@/components/Post";
import ActionBar from "@/components/ActionBar";
import ReplyInput from "@/components/ReplyInput";
import useStorage from "../../../hooks/useStorage";

export default function Tweet() {
  const router = useRouter();
  const { tweetId } = router.query;
  const [post, setPosts] = useState([]);
  const { getItem, removeItem } = useStorage();
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(1);

  useEffect(() => {
    setUsername(getItem("username", "session"));
    setIsAdmin(getItem("admin", "session"));
  }, [getItem("username", "session"), getItem("admin", "session")]);

  useEffect(() => {
    if (username != null && tweetId != undefined) {
      fetch(
        "http://localhost:3000/api/tweets?tweetid=" +
          tweetId +
          "&username=" +
          username,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.data !== null) {
            setPosts(data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [username, tweetId]);

  const [showPopUp, setShowPopUp] = useState(false);

  const handleButtonClick = () => {
    setShowPopUp((prevState) => !prevState);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  if (post.length != 0) {
    console.log(post);

    return (
      <>
        <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
              Tweet
            </h2>
          </div>
          <div>
            {post != null ? (
              <>
                {/* <TweetPost key={post.id} post={post} /> */}
                <div className="border-b">
                  <ActionBar post={post} />
                </div>
              </>
            ) : null}
            <ReplyInput post={post} userImg={post.userObjectId.usrImg} />
            {post.commentId.map((id) => (
              <Post key={id} id={id} />
            ))}
          </div>
        </div>
        <Widget />
      </>
    );
  }
}
