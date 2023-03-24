import Input from "./Input";
import Post from "./Post";

export default function Feed() {
  const posts = [
    // Placeholder I guess, will be replaced by the data from the database
    {
      id: "1",
      username: "hello",
      userId: "helloId",
      userImg:
        "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      img: "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      text: "hello",
      timestamp: "1ms ago",
    },
    {
      id: "2",
      username: "byebye",
      userId: "byebyeId",
      userImg:
        "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      img: "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      text: "hello",
      timestamp: "just now",
    },
  ];

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post} />
      ))}
    </div>
  );
}
