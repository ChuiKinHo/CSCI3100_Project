/*
 * -----------------------------
 * File - ReplyInput.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
import useStorage from "../hooks/useStorage";
import { useEffect, useState } from "react";
import { userImg } from "../_unsorted/imageRelated/cloudinary/utils";
import { useRef } from "react";

export default function ReplyInput({ post, onReply }) {
  const { getItem, removeItem } = useStorage();
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const isMountedRef = useRef(false);
  const [input, setInput] = useState("");
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
      targetTweetId: post.id,
      img: "",
      retweet: false,
    };
    //console.log(reqData);
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
            onReply();
            console.log("reply Tweet successful");
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
  if (isMountedRef && userInfo != null) {
    return (
      <div className="flex border-b border-gray-200 p-3 space-x-3">
        {userImg(userInfo)}
        <div className="w-full divide-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row">
              <textarea
                id="input"
                name="input"
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 resize-none"
                rows="2"
                placeholder="Tweet your reply"
                value={input}
                onChange={handleInputChange}
              ></textarea>
              <div>
                {input.length === 0 ? (
                  <button
                    type="submit"
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                    disabled
                  >
                    Reply
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                )}
              </div>
            </div>
            <p className="text-red-500">{warning}</p>
          </form>
        </div>
      </div>
    );
  }
}
