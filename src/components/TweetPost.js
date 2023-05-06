/*
 * -----------------------------
 * File - TweetPost.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userImg } from "../_unsorted/imageRelated/cloudinary/utils";
import ActionBar from "./ActionBar";
import Post from "./Post";
import useStorage from "../hooks/useStorage";

export default function TweetPost({ post }) {
  const router = useRouter();
  const [targetPost, setTargetPost] = useState(null);
  const { getItem } = useStorage();
  const [loginUsername, setLoginUsername] = useState(null);
  useEffect(() => {
    setLoginUsername(getItem("username", "session"));
  }, [getItem("username", "session")]);
  useEffect(() => {
    if (targetPost !== null) {
      console.log(targetPost.id);
    }

    if (post.targetTweetId !== null && loginUsername !== null) {
      fetch(
        "/api/tweets?tweetid=" +
          post.targetTweetId +
          "&username=" +
          loginUsername,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.data !== null) {
            //setState(true);
            setTargetPost(data.data);
            //console.log(data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [loginUsername]);
  if (post !== null)
    return (
      <>
        {targetPost === null || post.retweet ? (
          ""
        ) : (
          <TweetPost
            key={targetPost.id}
            post={targetPost}
            loginUsername={loginUsername}
          />
        )}
        <Post id={post.id} />
        {/* <div className="p-3 cursor-pointer border-b border-gray-200">
          <div className="flex">
            <Link href={"/" + post.userObjectId.username}>
              {userImg(post.userObjectId)}
            </Link>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="items-center space-x-1 whitespace-nowrap">
                  <Link href={"/" + post.userObjectId.username}>
                    <h4 className="leading-none font-bold text-[15px] sm:text-[16px] hover:underline">
                      {post.userObjectId.name}
                    </h4>
                  </Link>
                  <span className="text-sm sm:text-[15px]">
                    @{post.userObjectId.username}
                  </span>
                </div>

                <EllipsisHorizontalCircleIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 " />
              </div>

              <img className="rounded-2xl mr-2" src={post.image} alt="" />
            </div>
          </div>
          <div>
            <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
              {post.text}
            </p>
          </div>
          <ActionBar key={post.id} post={post} />
        </div> */}
      </>
    );
}
