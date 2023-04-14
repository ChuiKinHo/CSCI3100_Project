import {
  ChatBubbleBottomCenterTextIcon,
  EllipsisHorizontalCircleIcon,
  ArrowPathRoundedSquareIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
// import Link from "next/link";
import { CldImage } from "next-cloudinary";
import React, { useState, useEffect } from "react";
// import Retweet from "@/components/Retweet";
import ActionBar from "@/components/ActionBar";
import useStorage from "../hooks/useStorage";
import {
  userImg,
  imageVideoDisplay,
} from "../_unsorted/imageRelated/cloudinary/utils";
import Retweet from "./Retweet";
import { useRouter } from "next/router";

export default function Post({ id }) {
  const { getItem, removeItem } = useStorage();
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(1);
  const [post, setPost] = useState(null);
  const [retweet, setRetweet] = useState(null);
  const [permission, setPermission] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUsername(getItem("username", "session"));
    setIsAdmin(getItem("admin", "session"));
  }, [getItem("username", "session"), getItem("admin", "session")]);

  useEffect(() => {
    if (username != null) {
      fetch("/api/tweets?tweetid=" + id + "&username=" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
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
  }, [id, username]);

  useEffect(() => {
    if (post !== null && post.retweet && id !== null && permission) {
      fetch("/api/retweets?tweetid=" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data !== null) {
            setRetweet(data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [id, post]);

  const handleVideoClick = (event) => {
    event.preventDefault();
  };

  if (post && permission !== null) {
    //console.log(post);
    return !permission ? (
      ""
    ) : (
      <>
        {retweet !== null && retweet.userObjectId && (
          <div className="border border-gray-200">
            <div
              onClick={() => {
                router.push(
                  "/" + post.userObjectId.username + "/status/" + post.id
                );
              }}
            >
              <div className="hover:bg-gray-100">
                <div className="flex items-center">
                  <ArrowPathRoundedSquareIcon className="h-4 w-4" />
                  <span className="ml-1 text-gray-500">Retweeted</span>
                </div>

                <div className="flex items-center justify-start">
                  <div
                    onClick={() => {
                      router.push("/" + post.userObjectId.username);
                    }}
                  >
                    {userImg(post.userObjectId)}
                  </div>
                  <div className="flex items-center space-x-1 whitespace-nowrap">
                    <div
                      onClick={() => {
                        router.push("/" + post.userObjectId.username);
                      }}
                    >
                      <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                        {post.userObjectId.name}
                      </h4>
                    </div>
                    <span className="text-sm sm:text-[15px]">
                      @{post.userObjectId.username} -{" "}
                    </span>
                    <span className="text-sm sm:text-[15px]">
                      {new Intl.RelativeTimeFormat("en", {
                        numeric: "auto",
                      }).format(
                        -Math.floor(
                          (new Date() - new Date(post.timestamp)) /
                            (1000 * 60 * 60 * 24)
                        ),
                        "day"
                      )}
                    </span>
                  </div>

                  {/*TODO:: Turn this into button */}
                  {/* <EllipsisHorizontalCircleIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 " /> */}
                </div>

                <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">
                  {post.text}
                </p>

                <div className="p-1">
                  <div
                    onClick={() => {
                      router.push(
                        "/" +
                          retweet.userObjectId.username +
                          "/status/" +
                          retweet.id
                      );
                    }}
                  >
                    <div className="flex p-3 cursor-pointer border border-gray-200 m-2 hover:bg-gray-200">
                      <div
                        onClick={() => {
                          router.push("/" + retweet.userObjectId.username);
                        }}
                      >
                        {userImg(retweet.userObjectId)}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 whitespace-nowrap">
                            <div
                              onClick={() => {
                                router.push(
                                  "/" + retweet.userObjectId.username
                                );
                              }}
                            >
                              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                                {retweet.userObjectId.name}
                              </h4>
                            </div>
                            <span className="text-sm sm:text-[15px]">
                              @{retweet.userObjectId.username} -{" "}
                            </span>
                            <span className="text-sm sm:text-[15px]">
                              {new Intl.RelativeTimeFormat("en", {
                                numeric: "auto",
                              }).format(
                                -Math.floor(
                                  (new Date() - new Date(retweet.timestamp)) /
                                    (1000 * 60 * 60 * 24)
                                ),
                                "day"
                              )}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
                            {retweet.text}
                          </p>
                          {
                            retweet.img != "" &&
                              ([
                                "mp4",
                                "mov",
                                "avi",
                                "wmv",
                                "flv",
                                "mkv",
                                "webm",
                              ].includes(retweet.img.split(".").pop()) ? (
                                <div onClick={handleVideoClick}>
                                  {imageVideoDisplay(retweet.img, 700, 700)}
                                </div>
                              ) : (
                                <div>
                                  {imageVideoDisplay(retweet.img, 700, 700)}
                                </div>
                              ))
                            // <CldImage
                            //   width={700}
                            //   height={700}
                            //   crop="fill"
                            //   src={retweet?.img}
                            //   alt={retweet?.img}
                            // />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ActionBar post={post} />
          </div>
        )}

        {!post.retweet && post.userObjectId && (
          <div className="border border-gray-200">
            <div
              onClick={() => {
                router.push(
                  "/" + post.userObjectId.username + "/status/" + post.id
                );
              }}
            >
              <div className="flex p-3 cursor-pointer hover:bg-gray-100">
                <div
                  onClick={() => {
                    router.push("/" + post.userObjectId.username);
                  }}
                >
                  {userImg(post.userObjectId)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 whitespace-nowrap">
                      <div
                        onClick={() => {
                          router.push("/" + post.userObjectId.username);
                        }}
                      >
                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                          {post.userObjectId.name}
                        </h4>
                      </div>
                      <span className="text-sm sm:text-[15px]">
                        @{post.userObjectId.username} -{" "}
                      </span>
                      <span className="text-sm sm:text-[15px]">
                        {new Intl.RelativeTimeFormat("en", {
                          numeric: "auto",
                        }).format(
                          -Math.floor(
                            (new Date() - new Date(post.timestamp)) /
                              (1000 * 60 * 60 * 24)
                          ),
                          "day"
                        )}
                      </span>
                    </div>
                    {/*TODO:: Turn this into button */}
                    {/* <EllipsisHorizontalCircleIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 " /> */}
                    <div className="flex">
                      {post.targetTweetId && (
                        <ChatBubbleBottomCenterTextIcon className="h-10 w-10 p-2" />
                      )}
                      {post.private && (
                        <LockClosedIcon className="h-10 w-10 p-2" />
                      )}
                    </div>
                  </div>

                  <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">
                    {post.text}
                  </p>
                  {post.img !== "" &&
                    // <CldImage
                    //   width={700}
                    //   height={700}
                    //   crop="fill"
                    //   src={post?.img}
                    //   alt={post?.img}
                    // />
                    ([
                      "mp4",
                      "mov",
                      "avi",
                      "wmv",
                      "flv",
                      "mkv",
                      "webm",
                    ].includes(post.img.split(".").pop()) ? (
                      <div onClick={handleVideoClick}>
                        {imageVideoDisplay(post.img, 700, 700)}
                      </div>
                    ) : (
                      <div>{imageVideoDisplay(post.img, 700, 700)}</div>
                    ))}
                </div>
              </div>
            </div>
            <ActionBar post={post} />
          </div>
        )}
      </>
    );
  }
}
