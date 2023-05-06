/*
 * -----------------------------
 * File - [username].js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: instant message page
 * -----------------------------
 */
//page of instant messaging of users
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useStorage from "@/hooks/useStorage";
import { userImgProfile } from "../../_unsorted/imageRelated/cloudinary/utils";
import MessageFrom from "../../components/MessageFrom";
import MessageTo from "../../components/MessageTo";
import { useRef } from "react";

export default function userPage() {
  const { getItem } = useStorage();
  const [loginUsername, setLoginUsername] = useState(null);
  const [rendering, setRendering] = useState(false);
  const router = useRouter();
  const username = router.query.username;
  const [message, setMessage] = useState("");
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);
  const [message_sent, setMessageSent] = useState(false);

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      inputRef.current.click();
    }
  };

  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    usrImg: "",
    following: [],
    follower: [],
    mytweets: [],
  });

  const [loginUserInfo, setLoginInfo] = useState({
    username: "",
    name: "",
    usrImg: "",
    following: [],
    follower: [],
    mytweets: [],
  });

  const handleMessage = (event) => {
    event.preventDefault();
    const form = document.getElementById("my-form");
    if (form.checkValidity()) {
      const reqData = {
        message: inputText,
        username: loginUserInfo.username,
        targetUsername: username,
      };
      if (
        reqData.message !== "" &&
        reqData.username !== "" &&
        reqData.targetUsername !== ""
      ) {
        fetch("/api/users/privateChat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data !== null && data.success) {
              window.alert("Message Sent");
              setMessageSent(!message_sent);
            }
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
          });
      }
    } else {
      form.reportValidity();
    }
  };

  useEffect(() => {
    if (username) {
      fetch("/api/users?q=@" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (
            data.data !== undefined &&
            data.data !== null &&
            data.data.length != 0
          ) {
            setUserInfo(data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [username]);

  useEffect(() => {
    if (loginUsername) {
      fetch("/api/users?q=@" + loginUsername, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (
            data.data !== undefined &&
            data.data !== null &&
            data.data.length != 0
          ) {
            setLoginInfo(data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [loginUsername]);

  useEffect(() => {
    setLoginUsername(getItem("username", "session"));
  }, [getItem("username", "session")]);

  useEffect(() => {
    if (username && loginUserInfo.username !== "") {
      const reqData = {
        username: username,
        targetUsername: loginUserInfo.username,
      };
      fetch("/api/users/privateChat", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data !== null && data.success) {
            setMessage(data.data.messages);
            setRendering(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [username, loginUserInfo.username, message_sent]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [message]);
  function goBack() {
    router.back();
  }

  if (
    userInfo.username === "" &&
    loginUserInfo.username === "" &&
    rendering === false
  ) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
            <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
              <ArrowLeftIcon
                className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
                onClick={() => goBack()}
              />
              <div
                style={{ height: "50px", width: "50px" }}
                className="md rounded-full relative avatar"
              >
                <div className="absolute"> {userImgProfile(userInfo)}</div>
              </div>
              <h2 className="text-lg sm:text-xl font-bold cursor-pointer ml-3">
                {userInfo.name}
              </h2>
            </div>
            <div
              id="messages"
              className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
              ref={messagesEndRef}
            >
              {message.length === 0 ? (
                <p className="center">Start Chatting!</p>
              ) : (
                <div>
                  {message.map((msg, index) => (
                    <div key={index}>
                      {msg.user === loginUserInfo._id ? (
                        <MessageFrom
                          loginUserInfo={loginUserInfo}
                          text={msg.message}
                        />
                      ) : (
                        <MessageTo userInfo={userInfo} text={msg.message} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form
              clasNames="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0"
              id="my-form"
            >
              <div className="relative flex">
                <input
                  type="text"
                  placeholder="Write your message!"
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md "
                  required
                  onChange={handleTextChange}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                    onClick={handleMessage}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                  >
                    <span className="font-bold">Send</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 ml-2 transform rotate-90"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
