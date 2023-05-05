/*
 * -----------------------------
 * File - ActionBar.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
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
import useStorage from "../hooks/useStorage";
import React, { useState } from "react";
import Retweet from "@/components/Retweet";
import { useEffect } from "react";

export default function ActionBar({ post }) {
  const { getItem, removeItem } = useStorage();
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(1);
  const [likeByMe, setLikeByMe] = useState(post.like_by_me);
  const [dislikeByMe, setDislikeByMe] = useState(post.dislike_by_me);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [dislikeCount, setDislikeCount] = useState(post.dislikeCount);

  useEffect(() => {
    setUsername(getItem("username", "session"));
    setIsAdmin(getItem("admin", "session"));
  }, [getItem("username", "session"), getItem("admin", "session")]);

  const [showPopUp, setShowPopUp] = useState(false);

  const handleButtonClick = () => {
    setShowPopUp((prevState) => !prevState);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  function onClick_like() {
    if (username != null) {
      fetch("/api/like?tweetid=" + post.id + "&username=" + username, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (likeByMe) {
          setLikeCount(likeCount - 1);
        } else {
          setLikeCount(likeCount + 1);
        }
        setLikeByMe(!likeByMe);
      });
    } else {
      console.log("please wait for the page to finish loading");
    }
  }

  function onClick_dislike() {
    if (username != null) {
      fetch("/api/dislike?tweetid=" + post.id + "&username=" + username, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (dislikeByMe) {
          setDislikeCount(dislikeCount - 1);
        } else {
          setDislikeCount(dislikeCount + 1);
        }
        setDislikeByMe(!dislikeByMe);
      });
    } else {
      console.log("please wait for the page to finish loading");
    }
  }

  return (
    <div className="flex justify-between text-gray-500 p-2">
      <Link href={"/" + post.userObjectId.username + "/status/" + post.id}>
        <button className="flex items-center select-none">
          <ChatBubbleBottomCenterTextIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </button>
      </Link>

      <button
        className="flex items-center group"
        onClick={() => {
          onClick_like();
        }}
      >
        {likeByMe ? (
          <>
            <HandThumbUpIconSolid className="h-9 w-9 hoverEffect p-2 hover:text-green-600 hover:bg-green-100 text-green-600 group-hover:text-green-600 group-hover:bg-green-100" />
            <span className="text-green-600 text-sm select-none group-hover:text-green-600 px-1">
              {likeCount}
            </span>
          </>
        ) : (
          <>
            <HandThumbUpIcon className="h-9 w-9 hoverEffect p-2 hover:text-green-600 hover:bg-green-100 text-gray-600 group-hover:text-green-600" />
            <span className="text-gray-600 text-sm select-none group-hover:text-green-600 px-1">
              {likeCount}
            </span>
          </>
        )}
      </button>

      <button
        className="flex items-center group"
        onClick={() => {
          onClick_dislike();
        }}
      >
        {dislikeByMe ? (
          <>
            <HandThumbDownIconSolid className="h-9 w-9 hoverEffect p-2 text-red-600 group-hover:text-red-600 group-hover:bg-red-100" />
            <span className="text-red-600 text-sm select-none group-hover:text-red-600 px-1">
              {dislikeCount}
            </span>
          </>
        ) : (
          <>
            <HandThumbDownIcon className="h-9 w-9 hoverEffect p-2 text-gray-600 group-hover:text-red-600 group-hover:bg-red-100" />
            <span className="text-gray-600 text-sm select-none group-hover:text-red-600 px-1">
              {dislikeCount}
            </span>
          </>
        )}
      </button>
      {post.private ? (
        <div className="flex items-center"></div>
      ) : (
        <button className="flex items-center">
          <ArrowPathRoundedSquareIcon
            className="h-9 w-9 hoverEffect p-2 hover:text-blue-600 hover:bg-blue-100"
            onClick={handleButtonClick}
          />
          {showPopUp && (
            <Retweet id={post.id} post={post} onClose={handleClosePopUp} />
          )}
        </button>
      )}
    </div>
  );
}
