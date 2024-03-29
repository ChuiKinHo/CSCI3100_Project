/*
 * -----------------------------
 * File - [tweetId].js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: tweet page with comments
 * -----------------------------
 */
import {
  ChatBubbleBottomCenterTextIcon,
  EllipsisHorizontalCircleIcon,
  ArrowPathRoundedSquareIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  HandThumbUpIcon as HandThumbUpIconSolid,
  HandThumbDownIcon as HandThumbDownIconSolid,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

import React, { useState } from "react";
// import Retweet from "@/components/Retweet";
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
  const [post, setPost] = useState([]);
  const { getItem, removeItem } = useStorage();
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(1);
  const [replyState, setReplyState] = useState(0);
  const [permission, setPermission] = useState(null);
  // handle reply
  const handleOnReply = () => {
    if (replyState !== null) setReplyState(replyState + 1);
    else setReplyState(0);
  };

  function goBack() {
    router.back();
  }
  // get username and admin status from session storage
  useEffect(() => {
    setUsername(getItem("username", "session"));
    setIsAdmin(getItem("admin", "session"));
  }, [getItem("username", "session"), getItem("admin", "session")]);
  // get the tweet
  useEffect(() => {
    if (username != null && tweetId != undefined) {
      fetch("/api/tweets?tweetid=" + tweetId + "&username=" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            if (data.data !== null && data.permission) {
              setPost(data.data);
              setPermission(true);
            } else if (!data.permission) {
              setPermission(false);
              setPost({});
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [username, tweetId, replyState]);

  const [showPopUp, setShowPopUp] = useState(false);

  const handleButtonClick = () => {
    setShowPopUp((prevState) => !prevState);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  const handleChildStateChange = () => {
    // if (childState !== null) setChildState(childState + 1);
    // else setChildState(0);
  };

  if (post && permission !== null) {
    return !permission ? (
      <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <h2 className="text-xl">no permission</h2>
      </div>
    ) : (
      <>
        <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <ArrowLeftIcon
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
              onClick={() => goBack()}
            />
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
              Tweet
            </h2>
          </div>
          <div>
            {post != null ? (
              <>
                <TweetPost key={post.id} post={post} loginUsername={username} />
                {/* <div className="border-b">
                  <ActionBar post={post} />
                </div> */}
              </>
            ) : null}
            <ReplyInput
              post={post}
              userImg={post.userObjectId.usrImg}
              onReply={handleOnReply}
            />
            {post.commentId.map((id) => (
              <Post key={id} id={id} />
            ))}
          </div>
        </div>
        <Widget
          onStateChange={handleChildStateChange}
          checkFol={() => {}}
          explore={false}
        />
      </>
    );
  }
}
