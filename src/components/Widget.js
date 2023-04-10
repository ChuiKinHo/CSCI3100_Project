import Search from "./Search.js";
import Post from "./Post.js";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import useStorage from "../hooks/useStorage";
import Link from "next/link.js";
import { useEffect, useState } from "react";

// TODO:: Remove sample data
// import recommendedPosts from "@/data/sampleRecommendedPosts.json";
import recommendedUsers from "@/data/sampleRecommendedUsers.json";

function NotLogin() {
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-4 space-y-4">
      <Search />
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

function getRecommendedPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/tweets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  // Randomly select three posts from the posts array
  const randomPosts = posts.sort(() => 0.5 - Math.random()).slice(0, 3);

  return randomPosts;
}

function getRecommendedUsers() {
  return recommendedUsers;
}

export default function Widget() {
  const { getItem } = useStorage();
  const [username, setUsername] = useState(null);
  useEffect(
    () => setUsername(getItem("username", "session")),
    [getItem("username", "session")]
  );

  // TODO:: think about refreshing the page, is there any problem? If no, then remove this line.
  const posts = getRecommendedPosts();
  const randomUsers = getRecommendedUsers();

  return username != null ? (
    <div className="xl:w-[600px] hidden lg:inline ml-4 space-y-4">
      <Search />

      <h4 className="font-bold text-xl px-4">Who to follow</h4>
      {randomUsers.map((randomUser) => (
        <div
          key={randomUser.id}
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out"
        >
          <Link href={"/" + randomUser.username}>
            <img
              className="rounded-full"
              width="40"
              src={randomUser.userImg}
              alt=""
            />
          </Link>

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
          <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">
            Follow
          </button>
        </div>
      ))}
      <button className="text-blue-300 pl-4 pb-3 hover:text-blue-400">
        Show more
      </button>

      <div className="flex items-center p-3 relative">
        <ChatBubbleBottomCenterTextIcon className="h-5 text-gray-500" />
        <h4 className="font-bold text-xl px-4">You may like</h4>
      </div>
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post} />
      ))}
      <button className="text-blue-300 pl-4 pb-3 hover:text-blue-400">
        Show more
      </button>
    </div>
  ) : (
    NotLogin()
  );
}
