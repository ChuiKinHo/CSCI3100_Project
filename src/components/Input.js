/*
 * -----------------------------
 * File - Input.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/20/solid";
import useStorage from "../hooks/useStorage";
import { useEffect, useState } from "react";
import {
  userImg,
  imageVideoDisplay,
} from "../_unsorted/imageRelated/cloudinary/utils";
import { useRef } from "react";
import { useRouter } from "next/router";
import { CldUploadButton } from "next-cloudinary";

export default function Input() {
  const router = useRouter();
  const { getItem, removeItem } = useStorage();
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const isMountedRef = useRef(false);
  const [input, setInput] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [imgid, setImgid] = useState("");
  const [warning, setWarning] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setWarning("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reqData = {
      username: username,
      input: input,
      targetTweetId: "",
      img: imgid,
      retweet: false,
      private: isPrivate,
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
            console.log("post Tweet successful");
            router.push("/" + username + "/status/" + data.data.id);
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

  useEffect(() => {
    setUsername(getItem("username", "session"));
    setIsAdmin(getItem("admin", "session"));
  }, [getItem("username", "session"), getItem("admin", "session")]);

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

  const handleSetPrivate = () => {
    setIsPrivate(!isPrivate);
  };

  if (isMountedRef && userInfo != null) {
    return (
      <div className="flex border-b border-gray-200 p-3 space-x-3">
        <div>{userImg(userInfo)}</div>
        <div className="w-full divide-y divide-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="flex-1">
              <textarea
                id="input"
                name="input"
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 resize-none"
                rows="2"
                placeholder="What's happening?"
                value={input}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="flex items-center justify-between pt-2.5">
              {imgid !== "" && imageVideoDisplay(imgid, 700, 700)}
            </div>

            <div className="flex items-center justify-between pt-2.5">
              <div className="flex">
                <CldUploadButton
                  onUpload={(result, widget, error) => {
                    if (result.event === "success") {
                      setImgid(result.info.secure_url.split("upload/")[1]);
                      widget.close();
                    }
                  }}
                  onClick={(e, widget) => {
                    e.preventDefault();
                  }}
                  uploadPreset="ml_unsigned"
                >
                  <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                </CldUploadButton>
                {isPrivate ? (
                  <div
                    className="bg-white text-green-500 border border-green-300 px-4 py-1.5 rounded-full font-bold shadow-md hover:bg-green-100 disabled:opacity-50 cursor-pointer"
                    onClick={handleSetPrivate}
                  >
                    private
                  </div>
                ) : (
                  <div
                    className="bg-white text-violet-500 border border-violet-300 px-4 py-1.5 rounded-full font-bold shadow-md hover:bg-violet-100 disabled:opacity-50 cursor-pointer"
                    onClick={handleSetPrivate}
                  >
                    public
                  </div>
                )}
              </div>
              {input.length === 0 ? (
                <button
                  type="submit"
                  className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  disabled
                >
                  Tweet
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                >
                  Tweet
                </button>
              )}
            </div>
            <p className="text-red-500">{warning}</p>
          </form>
        </div>
      </div>
    );
  }
}
