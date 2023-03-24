import Search from "./Search.js";
import Post from "./Post.js";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/20/solid";

export default function Widget() {
  const posts = [
    // Placeholder I guess, will be replaced by the data from the database
    {
      id: "1",
      name: "hello",
      username: "hello",
      userImg:
        "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      img: "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      text: "hello",
      timestamp: "1ms ago",
    },
    {
      id: "2",
      name: "hello",
      username: "hello",
      userImg:
        "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      img: "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      text: "hello",
      timestamp: "just now",
    },
  ];
  const randomUser = [
    {
      id: "1",
      name: "hello",
      username: "hello",
      picture:
        "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      img: "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      text: "hello",
      timestamp: "1ms ago",
    },
    {
      id: "2",
      name: "hello",
      username: "hello",
      picture:
        "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      img: "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      text: "hello",
      timestamp: "just now",
    },
    {
      id: "3",
      name: "hello",
      username: "hello",
      picture:
        "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      img: "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      text: "hello",
      timestamp: "just now",
    },
  ];
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-4 space-y-4">
      <Search />

      <h4 className="font-bold text-xl px-4">Who to follow</h4>
      {randomUser.map((randomUser) => (
        <div
          key={randomUser.id}
          className="flex items-center px-4 py-2  cursor-pointer hover:bg-gray-200 transition duration-500 ease-out"
        >
          <img
            className="rounded-full"
            width="40"
            src={randomUser.picture}
            alt=""
          />
          <div className="truncate ml-4 leading-5">
            <h4 className="font-bold hover:underline text-[14px] truncate">
              @{randomUser.username}
            </h4>
            <h5 className="text-[13px] text-gray-500 truncate">
              {randomUser.name}
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
        <ChatBubbleBottomCenterTextIcon className="h-5 z-50 text-gray-500" />
        <h4 className="font-bold text-xl px-4">You may like</h4>
      </div>
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post} />
      ))}
      <button className="text-blue-300 pl-4 pb-3 hover:text-blue-400">
        Show more
      </button>
    </div>
  );
}
