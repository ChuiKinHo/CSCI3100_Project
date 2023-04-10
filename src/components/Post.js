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
import ActionBar from "@/components/ActionBar";

export default function Post({ post, id }) {
  if (post.userObjectId && post.userObjectId.username) {
    return (
      <>
        {post.retweet && (
          <div className="flex items-center">
            <ArrowPathRoundedSquareIcon className="h-4 w-4" />
            <span className="ml-1 text-gray-500">Retweeted</span>
          </div>
        )}

        <div className="flex p-3 cursor-pointer border-b border-gray-200">
          <Link href={"/" + post.userObjectId.username}>
            <img
              className="h-11 w-11 rounded-full mr-4"
              src={post.userObjectId.usrImg}
              alt="user-img"
            />
          </Link>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 whitespace-nowrap">
                <Link href={"/" + post.userObjectId.username}>
                  <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                    {post.userObjectId.name}
                  </h4>
                </Link>
                <span className="text-sm sm:text-[15px]">
                  @{post.userObjectId.username} -{" "}
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
            <img className="w-full" src={post?.img} alt="" />
            <ActionBar post={post} />
          </div>
        </div>
      </>
    );
  } else {
    console.log(post);
  }
}
