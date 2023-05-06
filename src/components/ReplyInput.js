/*
 * -----------------------------
 * File - ReplyInput.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: Reply input component
 * -----------------------------
 */
// Import dependencies
import useStorage from "../hooks/useStorage";
import { useEffect, useState } from "react";
import { userImg } from "../_unsorted/imageRelated/cloudinary/utils";
import { useRef } from "react";

// Define the ReplyInput component
export default function ReplyInput({ post, onReply }) {
  // Initialize state variables using the useState hook
  const { getItem, removeItem } = useStorage();
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const isMountedRef = useRef(false);
  const [input, setInput] = useState("");
  const [warning, setWarning] = useState("");

  // Define the handleInputChange function, which is called when the user types in the reply input field
  const handleInputChange = (e) => {
    setInput(e.target.value);
    setWarning(""); // Clear any warning messages
  };

  // Define the handleSubmit function, which is called when the user submits the reply form
  const handleSubmit = (event) => {
    event.preventDefault();
    const reqData = {
      username: username,
      input: input,
      targetTweetId: post.id,
      img: "",
      retweet: false,
    };
    // Check whether the required data is present and not empty
    if (
      reqData.username !== null &&
      reqData.input !== null &&
      reqData.input.length !== 0
    ) {
      // Make a POST request to the server to submit the reply
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
            onReply(); // Call the onReply callback to update the UI
            console.log("reply Tweet successful");
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    } else {
      // Display a warning message if the input is invalid or empty
      if (reqData.input === null || reqData.input.length === 0) {
        setWarning("Input cannot be empty");
      } else {
        setWarning("An error occur");
      }
    }
    setInput(""); // Clear the input field after submission
  };

  // Use the useEffect hook to fetch the username and isAdmin data from the browser's local storage
  useEffect(() => {
    setUsername(getItem("username", "session"));
    setIsAdmin(getItem("admin", "session"));
  }, [getItem("username", "session"), getItem("admin", "session")]);

  // Use the useEffect hook to fetch user info from the server based on the current username
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

  // Check whether the component is mounted and userInfo is not null before rendering
  if (isMountedRef && userInfo != null) {
    return (
      // Render the reply input form
      <div className="flex border-b border-gray-200 p-3 space-x-3">
        {userImg(userInfo)} {/* Render the user's avatar */}
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
                {/* Disable the Reply button if the input field is empty */}
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
            {/* Display any warning messages */}
          </form>
        </div>
      </div>
    );
  }
}
