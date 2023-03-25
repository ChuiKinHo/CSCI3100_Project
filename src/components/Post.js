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
import Retweet from "./Retweet";

export default function Post({ post, id }) {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleButtonClick = () => {
    setShowPopUp((prevState) => !prevState);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <>
      {post.retweet && (
        <div className="flex items-center">
          <ArrowPathRoundedSquareIcon className="h-4 w-4" />
          <span className="ml-1 text-gray-500">Retweeted</span>
        </div>
      )}

      <div className="flex p-3 cursor-pointer border-b border-gray-200">
        <img
          className="h-11 w-11 rounded-full mr-4"
          src={post.userImg}
          alt="user-img"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 whitespace-nowrap">
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post.name}
              </h4>

              <span className="text-sm sm:text-[15px]">
                @{post.username} -{" "}
              </span>
              <span className="text-sm sm:text-[15px] hover:underline">
                {post.timestamp}
              </span>
            </div>

            {/*TODO:: Turn this into button */}
            <EllipsisHorizontalCircleIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 " />
          </div>

          <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">
            {post.text}
          </p>
          {/* <img className="rounded-2xl mr-2" src={post.image} alt="" /> */}
          <div className="flex justify-between text-gray-500 p-2">
            <Link href={"/" + post.username + "/status/" + post.id}>
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
              {!post.like_by_me && post.like > 0 && (
                <span className="text-gray-600 text-sm select-none group-hover:text-green-600 px-1">
                  {post.like}
                </span>
              )}
            </button>
            <button className="flex items-center group">
              {post.dislike_by_me ? (
                <>
                  <HandThumbDownIconSolid className="h-9 w-9 hoverEffect p-2 text-red-600 group-hover:text-red-600 group-hover:bg-red-100" />
                  <span className="text-red-600 text-sm select-none group-hover:text-red-600 px-1">
                    {post.dislike}
                  </span>
                </>
              ) : (
                <HandThumbDownIcon className="h-9 w-9 hoverEffect p-2 text-gray-600 group-hover:text-red-600 group-hover:bg-red-100" />
              )}
              {!post.dislike_by_me && post.dislike > 0 && (
                <span className="text-gray-600 text-sm select-none group-hover:text-red-600 px-1">
                  {post.dislike}
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
        </div>
      </div>
    </>
  );
}
