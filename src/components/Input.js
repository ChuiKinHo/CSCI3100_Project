import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/20/solid";
import useStorage from "../hooks/useStorage";
import { useEffect, useState } from "react";
import { userImg } from "../_unsorted/imageRelated/cloudinary/utils";
import { useRef } from "react";

export default function Input() {
  const { getItem, removeItem } = useStorage();
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const isMountedRef = useRef(false);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reqData = {
      username: username,
      input: input,
      targetTweetId: "",
    };
    //console.log(reqData);
    if (
      reqData.username !== null &&
      reqData.input !== null &&
      reqData.input.length !== 0
    ) {
      const reqData = {
        username: username,
        input: input,
        targetTweetId: "",
        img: "",
      };
      fetch("http://localhost:3000/api/post", {
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
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  };

  useEffect(() => {
    setUsername(getItem("username", "session"));
    setIsAdmin(getItem("admin", "session"));
  }, [getItem("username", "session"), getItem("admin", "session")]);

  useEffect(() => {
    if (username != null) {
      fetch("http://localhost:3000/api/users?q=@" + username, {
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
      fetch("http://localhost:3000/api/users?q=@" + username, {
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
              <div className="flex">
                <div className="">
                  <label htmlFor="image-upload">
                    <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </label>
                  <input id="image-upload" type="file" hidden />
                </div>
                <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
              </div>

              <button
                type="submit"
                className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
              >
                Tweet
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
