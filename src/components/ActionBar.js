/*
 * -----------------------------
 * File - ActionBar.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: Action bar components for each post
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

  //handle onclick of the like button
  function onClick_like() {
    //if the page is still loading, the username will be null
    //else the username will be the username of the current user
    //and the api will be called to like the post
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

  //handle onclick of the dislike button
  function onClick_dislike() {
    //if the page is still loading, the username will be null
    //else the username will be the username of the current user
    //and the api will be called to dislike the post
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
      {/* Button to navigate to the post page */}
      <Link href={"/" + post.userObjectId.username + "/status/" + post.id}>
        <button className="flex items-center select-none">
          <ChatBubbleBottomCenterTextIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </button>
      </Link>
      {/* Button to like the post */}
      <button
        className="flex items-center group"
        onClick={() => {
          onClick_like();
        }}
      >
        {/* if the user has already liked the post, the like button will be green*/}
        {likeByMe ? (
          <>
            <HandThumbUpIconSolid className="h-9 w-9 hoverEffect p-2 hover:text-green-600 hover:bg-green-100 text-green-600 group-hover:text-green-600 group-hover:bg-green-100" />
            <span className="text-green-600 text-sm select-none group-hover:text-green-600 px-1">
              {likeCount}
            </span>
          </>
        ) : (
          // if the user has not liked the post, the like button will be gray
          <>
            <HandThumbUpIcon className="h-9 w-9 hoverEffect p-2 hover:text-green-600 hover:bg-green-100 text-gray-600 group-hover:text-green-600" />
            <span className="text-gray-600 text-sm select-none group-hover:text-green-600 px-1">
              {likeCount}
            </span>
          </>
        )}
      </button>
      {/* Button to dislike the post */}
      <button
        className="flex items-center group"
        onClick={() => {
          onClick_dislike();
        }}
      >
        {/* if the user has already disliked the post, the dislike button will be red*/}
        {dislikeByMe ? (
          <>
            <HandThumbDownIconSolid className="h-9 w-9 hoverEffect p-2 text-red-600 group-hover:text-red-600 group-hover:bg-red-100" />
            <span className="text-red-600 text-sm select-none group-hover:text-red-600 px-1">
              {dislikeCount}
            </span>
          </>
        ) : (
          // else the dislike button will be gray
          <>
            <HandThumbDownIcon className="h-9 w-9 hoverEffect p-2 text-gray-600 group-hover:text-red-600 group-hover:bg-red-100" />
            <span className="text-gray-600 text-sm select-none group-hover:text-red-600 px-1">
              {dislikeCount}
            </span>
          </>
        )}
      </button>
      {/* Button to retweet the post */}
      {/* if the post is private, the retweet button will not be displayed */}
      {post.private ? (
        <div className="flex items-center"></div>
      ) : (
        //else the retweet button will be displayed and the retweet popup will be displayed if the user clicks on the button
        <button className="flex items-center">
          <ArrowPathRoundedSquareIcon
            className="h-9 w-9 hoverEffect p-2 hover:text-blue-600 hover:bg-blue-100"
            onClick={handleButtonClick}
          />
          {/* Display the retweet popup if showPopUp is true */}
          {showPopUp && (
            <Retweet id={post.id} post={post} onClose={handleClosePopUp} />
          )}
        </button>
      )}
    </div>
  );
}
