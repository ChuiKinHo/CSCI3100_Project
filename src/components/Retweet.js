/*
 * -----------------------------
 * File - Retweet.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: retweet pop up
 * -----------------------------
 */
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useStorage from "../hooks/useStorage";
import {
  userImg,
  imageVideoDisplay,
} from "../_unsorted/imageRelated/cloudinary/utils";
import { useEffect } from "react";
import { useRef } from "react";
import { useRouter } from "next/router";

const Retweet = ({ onClose, id }) => {
  const router = useRouter();
  const { getItem, removeItem } = useStorage();
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(1);
  const [post, setPost] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const isMountedRef = useRef(false);
  const [input, setInput] = useState("");
  const [warning, setWarning] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setWarning("");
  };

  //handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(id);
    const reqData = {
      username: username,
      input: input,
      targetTweetId: id,
      img: "",
      retweet: true,
    };
    if (
      reqData.username !== null &&
      reqData.input !== null &&
      reqData.input.length !== 0
    ) {
      fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data !== null && data.success) {
            onClose();
            router.push("/" + username + "/status/" + data.data.id);
            console.log("retweet successful");
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    } else {
      if (reqData.input === null || reqData.input.length === 0) {
        setWarning("Input cannot be empty");
      } else {
        setWarning("An error occur");
      }
    }
    setInput("");
  };
  //get username and admin status
  useEffect(() => {
    setUsername(getItem("username", "session"));
    setIsAdmin(getItem("admin", "session"));
  }, [getItem("username", "session"), getItem("admin", "session")]);

  //get user info
  useEffect(() => {
    if (username != null) {
      fetch("/api/users?q=@" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data.data);
          isMountedRef.current = true;

          return () => {
            isMountedRef.current = false;
          };
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [username]);

  //get post info
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
          if (data.data !== null) {
            setPost(data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [id, username]);

  const handlePopUpClick = (e) => {
    // Prevent the click event from propagating to the parent element
    e.stopPropagation();
  };

  const handleCloseClick = () => {
    onClose();
  };

  //if post is successfully fetched
  if (post !== null) {
    return (
      <div
        className="fixed z-50 inset-0 overflow-y-auto bg-gray-800 bg-opacity-50 flex items-center justify-center"
        onClick={handleCloseClick}
      >
        <form onSubmit={handleSubmit}>
          <div
            className="bg-white rounded-lg shadow-lg p-8 flex flex-col w-fit h-fit justify-between"
            onClick={handlePopUpClick}
          >
            {/* close button to close the popup */}
            <div className="flex justify-start ">
              <XMarkIcon
                className="h-6 w-6 float-right text-sky-500"
                onClick={handleCloseClick}
              />
            </div>
            <div className="flex p-3 cursor-pointer border-b border-gray-200">
              {/* user image of the login user */}
              {userImg(userInfo)}
              <div className="flex-1">
                <div className="flex items-center justify-between"></div>
                {/* text area for retweet input */}
                <div className="flex-1 ">
                  <textarea
                    id="input"
                    name="input"
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 resize-none"
                    rows="2"
                    placeholder="Add a comment..."
                    value={input}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                {/* user info and the post user wanna retweet*/}
                <div className="flex p-3 cursor-pointer border rounded-lg border-gray-300 ">
                  {userImg(post.userObjectId)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 whitespace-nowrap">
                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                          {post.userObjectId.username}
                        </h4>
                        <span className="text-sm sm:text-[15px]">
                          @{post.userObjectId.userId} -{" "}
                        </span>
                        <span className="text-sm sm:text-[15px] hover:underline">
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
                    </div>
                    <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
                      {post.text}
                    </p>
                    {/* if post has image or video, display it */}
                    {post.img !== "" && imageVideoDisplay(post.img, 300, 300)}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-red-500">{warning}</p>
            {/* if input is empty, disable button and prevent user to retweet*/}
            <div className="flex justify-end mt-3">
              {input.length === 0 ? (
                <button
                  type="submit"
                  className="bg-blue-400 hover:brightness-95 text-white font-bold py-2 px-4  rounded-full disabled:opacity-50"
                  disabled
                >
                  Retweet
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-400 hover:brightness-95 text-white font-bold py-2 px-4  rounded-full disabled:opacity-50"
                >
                  Retweet
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default Retweet;
