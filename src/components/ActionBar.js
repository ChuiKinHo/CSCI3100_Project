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

import React, { useState } from "react";
import Retweet from "@/components/Retweet";
import { useRouter } from "next/router";

export default function ActionBar({ post }) {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleButtonClick = () => {
    setShowPopUp((prevState) => !prevState);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  // const router = useRouter();

  // const handleClick = () => {
  //   router.push({
  //     pathname: `/${post.userObjectId.username}/status/${post.id}`,
  //     query: { tweetid: post.id },
  //   });
  // };

  return (
    <div className="flex justify-between text-gray-500 p-2">
      <Link href={"/" + post.userObjectId.username + "/status/" + post.id}>
        <button className="flex items-center select-none">
          <ChatBubbleBottomCenterTextIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </button>
      </Link>

      <button className="flex items-center group">
        {post.like_by_me ? (
          <>
            <HandThumbUpIconSolid className="h-9 w-9 hoverEffect p-2 hover:text-green-600 hover:bg-green-100 text-green-600 group-hover:text-green-600 group-hover:bg-green-100" />
            <span className="text-green-600 text-sm select-none group-hover:text-green-600 px-1">
              {post.like}
            </span>
          </>
        ) : (
          <HandThumbUpIcon className="h-9 w-9 hoverEffect p-2 hover:text-green-600 hover:bg-green-100 text-gray-600 group-hover:text-green-600" />
        )}
        {!post.like_by_me && post.likeCount > 0 && (
          <span className="text-gray-600 text-sm select-none group-hover:text-green-600 px-1">
            {post.likeCount}
          </span>
        )}
      </button>
      <button className="flex items-center group">
        {post.dislike_by_me ? (
          <>
            <HandThumbDownIconSolid className="h-9 w-9 hoverEffect p-2 text-red-600 group-hover:text-red-600 group-hover:bg-red-100" />
            <span className="text-red-600 text-sm select-none group-hover:text-red-600 px-1">
              {post.dislikeCount}
            </span>
          </>
        ) : (
          <HandThumbDownIcon className="h-9 w-9 hoverEffect p-2 text-gray-600 group-hover:text-red-600 group-hover:bg-red-100" />
        )}
        {!post.dislike_by_me && post.dislikeCount > 0 && (
          <span className="text-gray-600 text-sm select-none group-hover:text-red-600 px-1">
            {post.dislikeCount}
          </span>
        )}
      </button>

      <button className="flex items-center">
        <ArrowPathRoundedSquareIcon
          className="h-9 w-9 hoverEffect p-2 hover:text-blue-600 hover:bg-blue-100"
          onClick={handleButtonClick}
        />
        {showPopUp && (
          <Retweet id={post.id} post={post} onClose={handleClosePopUp} />
        )}
      </button>
    </div>
  );
}
