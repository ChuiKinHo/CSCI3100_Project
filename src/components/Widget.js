/*
 * -----------------------------
 * File - Widget.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: Widget component for the sidebar
 * -----------------------------
 */
import Search from "./Search.js";
import Post from "./Post.js";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import useStorage from "../hooks/useStorage";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import { userImg } from "../_unsorted/imageRelated/cloudinary/utils";

function NotLogin() {
  return (
    <div className=" lg:inline ml-4 space-y-4 my-5">
      <div>
        <Link href="/i/login">
          <button className="flex bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95">
            Login
          </button>
        </Link>
      </div>
      <div>
        <Link href="/i/signup">
          <button className="flex bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function Widget({ onStateChange, checkFol, explore }) {
  const { getItem } = useStorage();
  const [username, setUsername] = useState(null);
  const [posts, setPosts] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);

  // This useEffect hook fetches the latest tweets from the server when the `username` prop changes.
  // It then filters out any tweets authored by the current user and randomly selects 3 tweets to display.
  // The selected tweets are set as the component's state using `setPosts`.

  useEffect(() => {
    if (username) {
      fetch("/api/tweets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const filterPost = data.data.filter(
            (post) => post.userObjectId.username !== username
          );
          setPosts(filterPost.sort(() => 0.5 - Math.random()).slice(0, 3));
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [username]);

  // This useEffect hook fetches data about other users from the server when the `username` prop changes.
  // It then filters out the current user's data, randomly selects 3 users to display, and sets the `followed` property of each user.
  // The selected users are set as the component's state using `setRandomUsers`.
  useEffect(() => {
    if (username) {
      fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const users = data.data
            .filter((user) => user.username !== username)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          setRandomUsers(
            users.map((user) => ({
              ...user,
              followed: user.follower
                .map((follower) => follower.username)
                .includes(username),
            }))
          );
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [username]);

  useEffect(() => {
    setUsername(getItem("username", "session"));
  }, [getItem("username", "session")]);

  // This useEffect hook updates the `followed` property of a user in the `randomUsers` state when the `checkFol` prop changes.
  // The `checkFol` prop contains information about a user whose `followed` status has changed.
  // If the `randomUsers` state contains the user and their `followed` status has changed, the `randomUsers` state is updated accordingly.

  useEffect(() => {
    if (
      checkFol !== null &&
      checkFol !== undefined &&
      checkFol.username !== null &&
      checkFol.followed !== null &&
      username !== null &&
      randomUsers !== null
    ) {
      const index = randomUsers
        .map((user) => user.username)
        .indexOf(checkFol.username);
      if (
        index >= 0 &&
        index < randomUsers.length &&
        randomUsers[index].followed !== checkFol.followed
      ) {
        setRandomUsers(
          randomUsers.map((user, i) => {
            if (i === index) {
              user.followed = checkFol.followed;
              return user;
            } else {
              return user;
            }
          })
        );
      }
    }
  }, [checkFol]);

  // This function is called when the user clicks the follow button of a user in the `randomUsers` state.
  const handleFol = (index) => {
    fetch(
      "/api/follow?username=" +
        username +
        "&target=" +
        randomUsers[index].username,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== null && data.success) {
          const newRandomUsers = randomUsers.map((user, i) => {
            if (i === index) {
              return { ...user, followed: true };
            } else {
              return user;
            }
          });
          setRandomUsers(newRandomUsers);
          onStateChange();
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };
  // This function is called when the user clicks the unfollow button of a user in the `randomUsers` state.
  const handleUnfol = (index) => {
    fetch(
      "/api/follow?username=" +
        username +
        "&target=" +
        randomUsers[index].username,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== null && data.success) {
          const newRandomUsers = randomUsers.map((user, i) => {
            if (i === index) {
              return { ...user, followed: false };
            } else {
              return user;
            }
          });
          setRandomUsers(newRandomUsers);
          onStateChange();
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  return username != null && randomUsers !== null ? (
    <div
      // Set the class name of the div to be `xl:w-[600px]` if `explore` is true. Otherwise, set it to `hidden`.
      className={`xl:w-[600px] ${
        explore ? "" : "hidden"
      } lg:inline ml-4 space-y-4`}
    >
      {/* Render a `Search` component */}
      <Search />
      {/* Display the heading "Who to follow" */}
      <h4 className="font-bold text-xl px-4">Who to follow</h4>
      {/* Iterate through the `randomUsers` array using the `map()` function */}
      {randomUsers.map((randomUser, index) => {
        return (
          // For each user, display their information in a box
          <div
            key={randomUser._id}
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out"
          >
            {/* Render the user's profile picture, which is a link to their
            profile page */}
            <Link href={"/" + randomUser.username}>{userImg(randomUser)}</Link>
            {/* Display the user's name and username */}
            <div className="truncate ml-4 leading-5">
              <Link href={"/" + randomUser.username}>
                <h4 className="font-bold hover:underline text-[14px] truncate">
                  {randomUser.name}
                </h4>
              </Link>
              <h5 className="text-[13px] text-gray-500 truncate">
                @{randomUser.username}
              </h5>
            </div>
            {/* Display a button to follow or unfollow the user, depending on
            whether or not they are already followed */}
            {randomUser.followed ? (
              <button
                key={index}
                id={index}
                className="ml-auto bg-white text-black border rounded-full text-sm px-3.5 py-1.5 font-bold hover:bg-red-300"
                onClick={() => handleUnfol(index)}
              >
                Following
              </button>
            ) : (
              <button
                key={index}
                id={index}
                className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold"
                onClick={() => handleFol(index)}
              >
                Follow
              </button>
            )}
          </div>
        );
      })}
      {/* Display the heading "You may like" */}
      <div className="flex items-center p-3 relative">
        <ChatBubbleBottomCenterTextIcon className="h-5 text-gray-500" />
        <h4 className="font-bold text-xl px-4">You may like</h4>
      </div>
      {/* Iterate through the `posts` array using the `map()` function */}
      {posts.map((post) => (
        // Render a `Post` component for each post
        <Post key={post.id} id={post.id} post={post} />
      ))}
    </div>
  ) : (
    // Render the `NotLogin()` function if the `username` or `randomUsers` are null
    NotLogin()
  );
}
